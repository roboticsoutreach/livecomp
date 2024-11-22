import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../../trpc/trpc";
import { insertTeamSchema, teams } from "../../../db/schema/teams";
import { teamsRepository } from "./teams.repository";
import { and, eq } from "drizzle-orm";

export const teamsRouter = router({
    create: protectedProcedure.input(z.object({ data: insertTeamSchema })).mutation(async ({ input: { data } }) => {
        return await teamsRepository.create(data);
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
                })
                .partial()
                .optional()
        )
        .query(async ({ input }) => {
            const conditions = [];

            if (input?.filters?.competitionId) {
                conditions.push(eq(teams.competitionId, input.filters.competitionId));
            }

            return await teamsRepository.findMany({ where: and(...conditions) });
        }),

    fetchById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id } }) => await teamsRepository.findFirst({ where: eq(teams.id, id) })),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertTeamSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await teamsRepository.update(data, { where: eq(teams.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await teamsRepository.delete({ where: eq(teams.id, id) });
    }),
});

