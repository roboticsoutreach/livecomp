import { z } from "zod";
import { eq } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "../../../trpc/trpc";
import { insertShepherdSchema, shepherds } from "../../../db/schema/venues";
import { shepherdsRepository } from "./shepherds.repository";

export const shepherdsRouter = router({
    create: protectedProcedure.input(z.object({ data: insertShepherdSchema })).mutation(async ({ input: { data } }) => {
        return await shepherdsRepository.create(data);
    }),

    fetchAll: publicProcedure.query(async () => {
        return await shepherdsRepository.findMany();
    }),

    fetchAllByVenueId: publicProcedure
        .input(z.object({ venueId: z.string() }))
        .query(async ({ input: { venueId } }) => {
            return await shepherdsRepository.findMany({ where: eq(shepherds.venueId, venueId) });
        }),

    fetchById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id } }) => await shepherdsRepository.findFirst({ where: eq(shepherds.id, id) })),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertShepherdSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await shepherdsRepository.update(data, { where: eq(shepherds.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await shepherdsRepository.delete({ where: eq(shepherds.id, id) });
    }),
});

