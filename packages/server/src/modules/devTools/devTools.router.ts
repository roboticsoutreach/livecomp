import { z } from "zod";
import { restrictedProcedure, router } from "../../trpc/trpc";
import { matchPeriodsRepository } from "../matchPeriods/matchPeriods.repository";
import { DateTime } from "luxon";
import { count, eq } from "drizzle-orm";
import { matchPeriods } from "../../db/schema/matches";
import { competitionsReponsitory } from "../competitions/competitions.repository";
import { competitions } from "../../db/schema/competitions";
import { TRPCError } from "@trpc/server";
import { teamsRepository } from "../teams/teams.repository";

export const devToolsRouter = router({
    resetMatchPeriod: restrictedProcedure("admin")
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            const now = DateTime.now();

            await matchPeriodsRepository.update(
                {
                    startsAt: now.plus({ seconds: 60 - now.second }).toJSDate(),
                    cursorPosition: -1,
                    status: "notStarted",
                },
                { where: eq(matchPeriods.id, id) }
            );
        }),

    generateTeams: restrictedProcedure("admin")
        .input(z.object({ competitionId: z.string(), count: z.number() }))
        .mutation(async ({ input: { competitionId, count } }) => {
            const competition = await competitionsReponsitory.findFirst({
                where: eq(competitions.id, competitionId),
                with: { game: { with: { startingZones: true } }, venue: { with: { regions: true } } },
            });

            if (!competition) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Competition not found" });
            }

            const region = competition.venue.regions[0];
            if (!region) {
                throw new TRPCError({ code: "NOT_FOUND", message: "No regions found" });
            }

            for (let i = 0; i < count; i++) {
                await teamsRepository.create({
                    name: `Team ${i + 1}`,
                    shortName: `T${(i + 1).toString().padStart(2, "0")}`,
                    competitionId: competitionId,
                    regionId: region.id,
                });
            }
        }),
});

