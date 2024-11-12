import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc/trpc";
import { games, insertGameSchema } from "../../db/schema/games";
import { eq } from "drizzle-orm";

export const gamesRouter = router({
    create: protectedProcedure
        .input(z.object({ data: insertGameSchema }))
        .mutation(async ({ ctx, input: { data } }) => {
            await ctx.db.insert(games).values(data);
        }),

    fetchAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.games.findMany();
    }),

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
        return await ctx.db.query.games.findFirst({ where: eq(games.id, id) });
    }),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertGameSchema.partial() }))
        .mutation(async ({ ctx, input: { id, data } }) => {
            await ctx.db.update(games).set(data).where(eq(games.id, id));
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        await ctx.db.delete(games).where(eq(games.id, id));
    }),
});

