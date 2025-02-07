import { z } from "zod";
import { protectedProcedure, publicProcedure, restrictedProcedure, router } from "../../trpc/trpc";
import { insertMatchPeriodSchema, matchPeriods } from "../../db/schema/matches";
import { matchPeriodsRepository } from "./matchPeriods.repository";
import { and, asc, eq, or } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { matchesRepository } from "../matches/matches.repository";
import { matchAssignmentsRepository } from "../matchAssignments/matchAssignments.repository";

export const matchPeriodsRouter = router({
    create: restrictedProcedure("admin")
        .input(z.object({ data: insertMatchPeriodSchema }))
        .mutation(async ({ input: { data } }) => {
            return await matchPeriodsRepository.create(data);
        }),

    fetchAll: publicProcedure
        .input(
            z
                .object({
                    filters: z
                        .object({
                            competitionId: z.string(),
                        })
                        .partial(),
                    include: z
                        .object({
                            matches: z.boolean().optional(),
                        })
                        .optional(),
                })
                .partial()
                .optional()
        )
        .query(async ({ input }) => {
            const conditions = [];

            if (input?.filters?.competitionId) {
                conditions.push(eq(matchPeriods.competitionId, input.filters.competitionId));
            }

            return await matchPeriodsRepository.findMany({
                where: and(...conditions),
                with: {
                    matches: input?.include?.matches ? { with: { assignments: { with: { team: true } } } } : undefined,
                },
                orderBy: asc(matchPeriods.startsAt),
            });
        }),

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
        return await matchPeriodsRepository.findFirst({ where: eq(matchPeriods.id, id) });
    }),

    fetchActiveByCompetitionId: publicProcedure
        .input(z.object({ competitionId: z.string(), nextIfNotFound: z.boolean().optional() }))
        .query(async ({ input: { competitionId, nextIfNotFound } }) => {
            const matchPeriod = await matchPeriodsRepository.findFirst({
                where: and(
                    eq(matchPeriods.competitionId, competitionId),
                    or(eq(matchPeriods.status, "inProgress"), eq(matchPeriods.status, "paused"))
                ),
                with: { matches: { with: { assignments: { with: { team: true } } } } },
            });

            if (!matchPeriod && nextIfNotFound) {
                return await matchPeriodsRepository.findFirst({
                    where: and(eq(matchPeriods.competitionId, competitionId), eq(matchPeriods.status, "notStarted")),
                    orderBy: asc(matchPeriods.startsAt),
                    with: { matches: { with: { assignments: { with: { team: true } } } } },
                });
            }

            return matchPeriod;
        }),

    update: restrictedProcedure("admin")
        .input(
            z.object({
                id: z.string(),
                data: insertMatchPeriodSchema.partial(),
            })
        )
        .mutation(async ({ input: { id, data } }) => {
            return await matchPeriodsRepository.update(data, { where: eq(matchPeriods.id, id) });
        }),

    importSchedule: restrictedProcedure("admin")
        .input(z.object({ id: z.string(), data: z.object({ schedule: z.string() }) }))
        .mutation(async ({ input: { id, data } }) => {
            const matchPeriod = await matchPeriodsRepository.findFirst({
                where: eq(matchPeriods.id, id),
                with: {
                    competition: {
                        with: {
                            game: {
                                with: {
                                    startingZones: true,
                                },
                            },
                            teams: true,
                        },
                    },
                    matches: true,
                },
            });

            if (!matchPeriod) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Match period not found" });
            }

            if (matchPeriod.matches.length > 0) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid schedule (matches already exist)" });
            }

            const parsedSchedule = data.schedule
                .split("\n")
                .map((s) => s.trim())
                .map((s) => s.split("|").map((s) => parseInt(s)));

            if (parsedSchedule.some((match) => match.length > matchPeriod.competition.game.startingZones.length)) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid schedule (a match exists with too many teams)",
                });
            }

            const teams = matchPeriod.competition.teams
                .map((team) => ({ team, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ team }) => team);

            let sequenceNumber = 0;

            for (const matchTeamIndexes of parsedSchedule) {
                const match = await matchesRepository.create({
                    name: `Match ${sequenceNumber}`,
                    matchPeriodId: matchPeriod.id,
                    sequenceNumber: sequenceNumber,
                });

                if (!match) {
                    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create match" });
                }

                for (let i = 0; i < matchTeamIndexes.length; i++) {
                    matchAssignmentsRepository.create({
                        matchId: match.id,
                        teamId: teams[matchTeamIndexes[i] - 1].id,
                        startingZoneId: matchPeriod.competition.game.startingZones[i].id,
                    });
                }

                sequenceNumber++;
            }
        }),

    delete: restrictedProcedure("admin")
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            return await matchPeriodsRepository.delete({ where: eq(matchPeriods.id, id) });
        }),
});

