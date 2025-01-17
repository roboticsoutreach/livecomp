import { z } from "zod";
import { displays, insertDisplaySchema } from "../../db/schema/displays";
import { publicProcedure, restrictedProcedure, router } from "../../trpc/trpc";
import { displaysRepository } from "./displays.repository";
import { and, eq } from "drizzle-orm";
import EventEmitter, { on } from "events";

const streamEmitter = new EventEmitter();
streamEmitter.setMaxListeners(0);

export const displaysRouter = router({
    create: restrictedProcedure("admin")
        .input(z.object({ data: insertDisplaySchema }))
        .mutation(async ({ input: { data } }) => {
            return await displaysRepository.create(data);
        }),

    fetchAll: publicProcedure
        .input(
            z
                .object({ filters: z.object({ competitionId: z.string() }).partial().optional() })
                .partial()
                .optional()
        )
        .query(async ({ input }) => {
            const filters = [];

            if (input?.filters?.competitionId) {
                filters.push(eq(displays.competitionId, input.filters.competitionId));
            }

            return await displaysRepository.findMany({ where: and(...filters) });
        }),

    fetchById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
        return await displaysRepository.findFirst({ where: eq(displays.id, id) });
    }),

    update: restrictedProcedure("admin")
        .input(z.object({ id: z.string(), data: insertDisplaySchema.partial() }))
        .mutation(async ({ input: { id, data } }) => {
            return await displaysRepository.update(data, { where: eq(displays.id, id) });
        }),

    delete: restrictedProcedure("admin")
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            return await displaysRepository.delete({ where: eq(displays.id, id) });
        }),

    onStreamMessage: publicProcedure.input(z.object({ identifier: z.string() })).subscription(async function* ({
        signal,
        input: { identifier },
    }) {
        try {
            await displaysRepository.update({ online: true }, { where: eq(displays.identifier, identifier) });

            for await (const [data] of on(streamEmitter, "stream", { signal })) {
                yield data;
            }
        } finally {
            await displaysRepository.update({ online: false }, { where: eq(displays.identifier, identifier) });
        }
    }),
});

