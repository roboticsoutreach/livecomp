import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc/trpc";
import { insertStartingZoneSchema, startingZones } from "../../db/schema/games";
import { eq } from "drizzle-orm";
import { startingZonesRepository } from "./startingZones.repository";

export const startingZonesRouter = router({
    create: protectedProcedure
        .input(z.object({ data: insertStartingZoneSchema }))
        .mutation(async ({ input: { data } }) => {
            return await startingZonesRepository.create(data);
        }),

    fetchAll: publicProcedure.query(async () => {
        return await startingZonesRepository.findMany();
    }),

    fetchAllByGameId: publicProcedure.input(z.object({ gameId: z.string() })).query(async ({ input: { gameId } }) => {
        return await startingZonesRepository.findMany({ where: eq(startingZones.gameId, gameId) });
    }),

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
        return await startingZonesRepository.findFirst({ where: eq(startingZones.id, id) });
    }),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertStartingZoneSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await startingZonesRepository.update(data, { where: eq(startingZones.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await startingZonesRepository.delete({ where: eq(startingZones.id, id) });
    }),
});

