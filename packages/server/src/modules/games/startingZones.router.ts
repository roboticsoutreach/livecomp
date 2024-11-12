import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc/trpc";
import { insertStartingZoneSchema, startingZones } from "../../db/schema/games";
import { eq } from "drizzle-orm";

export const startingZonesRouter = router({
    create: protectedProcedure
        .input(z.object({ data: insertStartingZoneSchema }))
        .mutation(async ({ ctx, input: { data } }) => {
            await ctx.db.insert(startingZones).values(data);
        }),

    fetchAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.startingZones.findMany();
    }),

    fetchAllByGameId: publicProcedure
        .input(z.object({ gameId: z.string() }))
        .query(async ({ ctx, input: { gameId } }) => {
            return await ctx.db.query.startingZones.findMany({ where: eq(startingZones.gameId, gameId) });
        }),

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
        return await ctx.db.query.startingZones.findFirst({ where: eq(startingZones.id, id) });
    }),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertStartingZoneSchema.partial() }))
        .mutation(async ({ ctx, input: { id, data } }) => {
            await ctx.db.update(startingZones).set(data).where(eq(startingZones.id, id));
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        await ctx.db.delete(startingZones).where(eq(startingZones.id, id));
    }),
});

