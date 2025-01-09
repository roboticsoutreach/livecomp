import { CronJob } from "cron";
import { matchPeriodsRepository } from "../modules/matchPeriods/matchPeriods.repository";
import { eq, sql } from "drizzle-orm";
import { matchPeriods } from "../db/schema/matches";
import { log } from "../utils/log";
import { MatchPeriodClock } from "@livecomp/utils";

export const matchJob = new CronJob(
    "* * * * * *",
    async () => {
        const now = new Date();

        // Progress any in-progress match periods
        await matchPeriodsRepository.update(
            {
                cursorPosition: sql`cursor_position + 1`,
            },
            { where: eq(matchPeriods.status, "inProgress") }
        );

        // Start any pending match periods
        const pendingMatchPeriods = await matchPeriodsRepository.findMany({
            where: eq(matchPeriods.status, "notStarted"),
        });

        await Promise.all(
            pendingMatchPeriods
                .filter((period) => period.startsAt <= now)
                .map((period) =>
                    matchPeriodsRepository
                        .update({ status: "inProgress", cursorPosition: 0 }, { where: eq(matchPeriods.id, period.id) })
                        .then(() => log.info(`Started match period ${period.id}`))
                )
        );

        // End any match periods that have reached the end
        const inProgressMatchPeriods = await matchPeriodsRepository.findMany({
            where: eq(matchPeriods.status, "inProgress"),
            with: { competition: { with: { game: true } }, matches: true },
        });

        await Promise.all(
            inProgressMatchPeriods
                .filter(
                    (period) =>
                        period.cursorPosition >
                        new MatchPeriodClock(period, period.competition.game).getEndCursorPosition()
                )
                .map((period) =>
                    matchPeriodsRepository.update({ status: "finished" }, { where: eq(matchPeriods.id, period.id) })
                )
        );
    },
    null,
    false,
    "Europe/London"
);

