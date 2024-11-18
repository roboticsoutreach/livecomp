import { z } from "zod";
import { protectedProcedure, router } from "../../trpc/trpc";

export const createCompetitionWizardSchema = z.object({
    general: z.object({
        name: z.string(),
        shortName: z.string(),
        gameId: z.string(),
        venueId: z.string(),
    }),
    teams: z.union([
        z.object({
            type: z.literal("generated"),
            count: z.number(),
        }),
        z.object({
            type: z.literal("deferred"),
        }),
    ]),
});

export const competitionsRouter = router({
    createWithWizard: protectedProcedure
        .input(
            z.object({
                data: createCompetitionWizardSchema,
            })
        )
        .mutation(async ({ input: { data } }) => {}),
});

