import { z } from "zod";
import { publicProcedure, restrictedProcedure, router } from "../../trpc/trpc";
import { competitions, insertCompetitionSchema } from "../../db/schema/competitions";
import { competitionsReponsitory } from "./competitions.repository";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { teamsRepository } from "../teams/teams.repository";

export const competitionsRouter = router({
    create: restrictedProcedure("admin")
        .input(
            z.object({
                data: insertCompetitionSchema,
            })
        )
        .mutation(async ({ input: { data } }) => {
            return await competitionsReponsitory.create(data);
        }),

    fetchAll: publicProcedure.query(async () => {
        return await competitionsReponsitory.findMany();
    }),

    fetchById: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input: { id } }) => {
            return await competitionsReponsitory.findFirst({
                where: eq(competitions.id, id),
                with: {
                    venue: true,
                    game: {
                        with: {
                            startingZones: true,
                        },
                    },
                },
            });
        }),

    update: restrictedProcedure("admin")
        .input(z.object({ id: z.string(), data: insertCompetitionSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await competitionsReponsitory.update(data, { where: eq(competitions.id, id) });
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

    delete: restrictedProcedure("admin")
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            return await competitionsReponsitory.delete({ where: eq(competitions.id, id) });
        }),
});

