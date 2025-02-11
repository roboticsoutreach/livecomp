import { DateTime } from "luxon";
import type { ExcludeNull, MatchStatus } from "./types";
import type { AppRouterOutput } from "@livecomp/server/src/server";
import type { MatchPeriod } from "@livecomp/server/src/db/schema/matches";

interface MatchTimings {
    startsAt: DateTime;
    endsAt: DateTime | null;
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
        // Sort pauses once; we’ll simulate their effect on the timeline.
        const pauses = [...this.competition.pauses].sort(
            (a, b) => a.startsAt.getUTCMilliseconds() - b.startsAt.getUTCMilliseconds()
        );

        // Function to adjust a time value if it falls in or overlaps an offset gap.
        const applyOffsets = (time: DateTime, matchDuration: number) => {
            for (const offset of offsets) {
                const gapStart = DateTime.fromJSDate(offset.appliesFrom);
                const gapEnd = gapStart.plus({ seconds: offset.offset });
                // If the match starts before the gap and would run into it
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

        // We'll simulate the timeline including pauses.
        // Every period of duration will be "stretched" by any pause encountered.
        // If we hit a pause that is still active (endsAt === null), we'll return null.
        let pauseIndex = 0;
        const simulatePeriod = (current: DateTime, duration: number): DateTime | null => {
            let remaining = duration;
            while (remaining > 0 && pauseIndex < pauses.length) {
                const p = pauses[pauseIndex];
                const pauseStart = DateTime.fromJSDate(p.startsAt);
                // If the next pause starts after the period completes, break.
                if (pauseStart >= current.plus({ seconds: remaining })) break;
                const timeUntilPause = pauseStart.diff(current, "seconds").seconds;
                if (timeUntilPause < remaining) {
                    remaining -= timeUntilPause;
                    if (p.endsAt === null) return null; // Ongoing pause: match timing stays indeterminate.
                    const pauseEnd = DateTime.fromJSDate(p.endsAt);
                    current = pauseEnd;
                    pauseIndex++;
                }
            }
            return current.plus({ seconds: remaining });
        };

        // Set up the first match period.
        let matchPeriod = matchPeriods.shift();
        if (!matchPeriod) return timings;
        const slackSeconds = this.getSlackForMatchPeriod(matchPeriod);
        let timeAccumulator = DateTime.fromJSDate(matchPeriod.startsAt);
        timeAccumulator = applyOffsets(timeAccumulator, this.competition.game.matchDuration);

        const matchDuration = this.competition.game.matchDuration;
        const defaultSpacing = this.competition.game.defaultMatchSpacing;
        const stagingOpenOffset = this.competition.game.stagingOpenOffset;
        const stagingCloseOffset = this.competition.game.stagingCloseOffset;

        for (const match of this.competition.matches) {
            // If the next match wouldn't finish within the current match period (including slack), move to the next period.
            if (
                timeAccumulator.plus({ seconds: defaultSpacing + matchDuration }) >
                DateTime.fromJSDate(matchPeriod.endsAt).plus({ seconds: slackSeconds })
            ) {
                matchPeriod = matchPeriods.shift();
                if (!matchPeriod) break;
                // Reset pause index if necessary; pauses are assumed to be global, so we continue from the current timeline.
                timeAccumulator = DateTime.fromJSDate(matchPeriod.startsAt);
                timeAccumulator = applyOffsets(timeAccumulator, matchDuration);
            }

            const matchStart = timeAccumulator;
            // Simulate match playing time including any pauses.
            const matchEnd = simulatePeriod(matchStart, matchDuration);
            timings[match.id] = {
                startsAt: matchStart,
                // If a pause is in progress during the match, endsAt stays null.
                endsAt: matchEnd,
                stagingOpensAt: matchStart.minus({ seconds: stagingOpenOffset }),
                stagingClosesAt: matchStart.minus({ seconds: stagingCloseOffset }),
            };

            // If the match is still in progress because of a live pause, do not schedule further matches.
            if (matchEnd === null) break;

            // Advance timeAccumulator for the spacing period (simulate pauses during spacing as well).
            const newAccumulator = simulatePeriod(matchEnd, defaultSpacing);
            if (newAccumulator === null) break;
            timeAccumulator = applyOffsets(newAccumulator, matchDuration);
        }

        return timings;
    }

    public isPaused() {
        return this.competition.pauses.some((pause) => pause.endsAt === null);
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

        if (now >= timings.startsAt && timings.endsAt && now < timings.endsAt) {
            return "inProgress";
        }

        if (timings.endsAt && now >= timings.endsAt) {
            return "finished";
        }

        return "notStarted";
    }

    public getPreviousMatchId(now?: DateTime) {
        if (!now) now = DateTime.now();

        for (const [matchId, matchTimings] of Object.entries(this.timings).sort(
            ([, a], [, b]) => b!.startsAt.toUnixInteger() - a!.startsAt.toUnixInteger()
        )) {
            if (matchTimings?.endsAt && now >= matchTimings.endsAt) return matchId;
        }

        return undefined;
    }

    public getCurrentMatchId(now?: DateTime) {
        if (!now) now = DateTime.now();

        for (const [matchId, matchTimings] of Object.entries(this.timings).sort(
            ([, a], [, b]) => a!.startsAt.toUnixInteger() - b!.startsAt.toUnixInteger()
        )) {
            if (matchTimings?.endsAt && now >= matchTimings.startsAt && now < matchTimings.endsAt) return matchId;
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

