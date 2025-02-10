import { DateTime } from "luxon";
import type { ExcludeNull, MatchStatus } from "./types";
import type { AppRouterOutput } from "@livecomp/server/src/server";
import type { MatchPeriod } from "@livecomp/server/src/db/schema/matches";

interface MatchTimings {
    startsAt: DateTime;
    endsAt: DateTime;
    stagingOpensAt: DateTime;
    stagingClosesAt: DateTime;
}

export class CompetitionClock {
    private timings: Record<string, MatchTimings>;

    constructor(private readonly competition: ExcludeNull<AppRouterOutput["competitions"]["fetchById"]>) {
        this.timings = this.computeMatchTimings();
    }

    private getSlackForMatchPeriod(matchPeriod: MatchPeriod) {
        const max = DateTime.fromJSDate(matchPeriod.endsAt)
            .diff(DateTime.fromJSDate(matchPeriod.startsAt))
            .as("seconds");

        return Math.min(
            this.competition.pauses
                .filter(
                    (pause) =>
                        pause.endsAt !== null &&
                        pause.endsAt > matchPeriod.startsAt &&
                        pause.startsAt < matchPeriod.endsAt
                )
                .reduce(
                    (acc, pause) =>
                        acc +
                        DateTime.fromJSDate(pause.endsAt!).diff(DateTime.fromJSDate(pause.startsAt)).as("seconds"),
                    0
                ),
            max
        );
    }

    private computeMatchTimings() {
        const timings: Record<string, MatchTimings> = {};
        const matchPeriods = [...this.competition.matchPeriods].sort(
            (a, b) => a.startsAt.getUTCMilliseconds() - b.startsAt.getUTCMilliseconds()
        );
        const offsets = [...this.competition.offsets].sort(
            (a, b) => a.appliesFrom.getUTCMilliseconds() - b.appliesFrom.getUTCMilliseconds()
        );

        let matchPeriod = matchPeriods.shift();
        if (!matchPeriod) return timings;

        // Helper to adjust the scheduled time if it falls in or overlaps an offset gap
        const applyOffsets = (time: DateTime, matchDuration: number) => {
            for (const offset of offsets) {
                const gapStart = DateTime.fromJSDate(offset.appliesFrom);
                const gapEnd = gapStart.plus({ seconds: offset.offset });
                // If the match starts before the gap yet would run into it
                if (time < gapStart && time.plus({ seconds: matchDuration }) > gapStart) {
                    time = gapEnd;
                }
                // Or if the match already starts during the gap
                else if (time >= gapStart && time < gapEnd) {
                    time = gapEnd;
                }
            }
            return time;
        };

        const matchDuration = this.competition.game.matchDuration;
        const defaultSpacing = this.competition.game.defaultMatchSpacing;
        let timeAccumulator = DateTime.fromJSDate(matchPeriod.startsAt);
        timeAccumulator = applyOffsets(timeAccumulator, matchDuration);

        for (const match of this.competition.matches) {
            // Ensure the match fits in the current match period
            // We look ahead to see if the next match would overshoot the period (including slack)
            if (
                timeAccumulator.plus({ seconds: defaultSpacing + matchDuration }) >
                DateTime.fromJSDate(matchPeriod.endsAt).plus({ seconds: this.getSlackForMatchPeriod(matchPeriod) })
            ) {
                matchPeriod = matchPeriods.shift();
                if (!matchPeriod) break;
                timeAccumulator = DateTime.fromJSDate(matchPeriod.startsAt);
                timeAccumulator = applyOffsets(timeAccumulator, matchDuration);
            }

            timings[match.id] = {
                startsAt: timeAccumulator,
                endsAt: timeAccumulator.plus({ seconds: matchDuration }),
                stagingOpensAt: timeAccumulator.minus({ seconds: this.competition.game.stagingOpenOffset }),
                stagingClosesAt: timeAccumulator.minus({ seconds: this.competition.game.stagingCloseOffset }),
            };

            // Advance timeAccumulator for the next match and apply any offsets
            timeAccumulator = timeAccumulator.plus({ seconds: defaultSpacing + matchDuration });
            timeAccumulator = applyOffsets(timeAccumulator, matchDuration);
        }

        return timings;
    }

    public getTimings() {
        return this.timings;
    }

    public getMatchTimings(matchId: string) {
        return this.timings[matchId];
    }

    public getMatchStatus(matchId: string): MatchStatus {
        const timings = this.timings[matchId];

        if (!timings) {
            return "notStarted";
        }

        const now = DateTime.now();

        if (now >= timings.stagingOpensAt && now < timings.stagingClosesAt) {
            return "staging";
        }

        if (now >= timings.startsAt && now < timings.endsAt) {
            return "inProgress";
        }

        if (now >= timings.endsAt) {
            return "finished";
        }

        return "notStarted";
    }

    public getPreviousMatchId(now?: DateTime) {
        if (!now) now = DateTime.now();

        for (const [matchId, matchTimings] of Object.entries(this.timings).sort(
            ([, a], [, b]) => b!.startsAt.toUnixInteger() - a!.startsAt.toUnixInteger()
        )) {
            if (now >= matchTimings!.endsAt) return matchId;
        }

        return undefined;
    }

    public getCurrentMatchId(now?: DateTime) {
        if (!now) now = DateTime.now();

        for (const [matchId, matchTimings] of Object.entries(this.timings).sort(
            ([, a], [, b]) => a!.startsAt.toUnixInteger() - b!.startsAt.toUnixInteger()
        )) {
            if (now >= matchTimings!.startsAt && now < matchTimings!.endsAt) return matchId;
        }

        return undefined;
    }

    public getNextMatchId(now?: DateTime) {
        if (!now) now = DateTime.now();

        for (const [matchId, matchTimings] of Object.entries(this.timings).sort(
            ([, a], [, b]) => a!.startsAt.toUnixInteger() - b!.startsAt.toUnixInteger()
        )) {
            if (now < matchTimings!.startsAt) return matchId;
        }

        return undefined;
    }
}

