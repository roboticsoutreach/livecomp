import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc/trpc";
import { competitions, insertCompetitionSchema } from "../../db/schema/competitions";
import { competitionsReponsitory } from "./competitions.repository";
import { eq } from "drizzle-orm";

export const competitionsRouter = router({
    create: protectedProcedure
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

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
        return await competitionsReponsitory.findFirst({ where: eq(competitions.id, id) });
    }),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: insertCompetitionSchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await competitionsReponsitory.update(data, { where: eq(competitions.id, id) });
        }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input: { id } }) => {
        return await competitionsReponsitory.delete({ where: eq(competitions.id, id) });
    }),
});

