import { z } from "zod";
import { protectedProcedure, router } from "../../trpc/trpc";
import { venues, venueSchema } from "../../db/schema/venues";
import { venuesRepository } from "./venues.repository";
import { eq } from "drizzle-orm";

export const venuesRouter = router({
    create: protectedProcedure.input(z.object({ data: venueSchema })).mutation(async ({ input: { data } }) => {
        return await venuesRepository.create(data);
    }),

    fetchAll: protectedProcedure.query(async () => {
        return await venuesRepository.findMany();
    }),

    fetchById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id } }) => await venuesRepository.findFirst({ where: eq(venues.id, id) })),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: venueSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await venuesRepository.update(data, { where: eq(venues.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await venuesRepository.delete({ where: eq(venues.id, id) });
    }),
});

