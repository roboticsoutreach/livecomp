import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "../../../trpc/trpc";
import { insertRegionSchema, regions } from "../../../db/schema/venues";
import { regionsRepository } from "./regions.repository";

export const regionsRouter = router({
    create: protectedProcedure.input(z.object({ data: insertRegionSchema })).mutation(async ({ input: { data } }) => {
        return await regionsRepository.create(data);
    }),

    fetchAll: publicProcedure
        .input(
            z
                .object({
                    filters: z
                        .object({
                            venueId: z.string(),
                        })
                        .partial()
                        .optional(),
                })
                .optional()
        )
        .query(async ({ input }) => {
            const conditions = [];

            if (input?.filters?.venueId) {
                conditions.push(eq(regions.venueId, input.filters.venueId));
            }

            return await regionsRepository.findMany({ where: and(...conditions) });
        }),

    fetchById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id } }) => await regionsRepository.findFirst({ where: eq(regions.id, id) })),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertRegionSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await regionsRepository.update(data, { where: eq(regions.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await regionsRepository.delete({ where: eq(regions.id, id) });
    }),
});

