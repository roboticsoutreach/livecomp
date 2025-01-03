import { z } from "zod";
import { restrictedProcedure, router } from "../../trpc/trpc";
import { matchPeriodsRepository } from "../matchPeriods/matchPeriods.repository";
import { DateTime } from "luxon";
import { eq } from "drizzle-orm";
import { matchPeriods } from "../../db/schema/matches";

export const devToolsRouter = router({
    resetMatchPeriod: restrictedProcedure("admin")
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id } }) => {
            const now = DateTime.now();

            await matchPeriodsRepository.update(
                {
                    startsAt: now.plus({ seconds: 60 - now.second }).toJSDate(),
                    cursorPosition: 0,
                    status: "notStarted",
                },
                { where: eq(matchPeriods.id, id) }
            );
        }),
});

