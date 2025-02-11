import { DateTime } from "luxon";
import type { ExcludeNull, MatchStatus } from "./types";
import type { AppRouterOutput } from "@livecomp/server/src/server";
import type { Match, MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import type { Offset, Pause } from "@livecomp/server/src/db/schema/competitions";

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
        // TODO split matches over match periods

        const timings: Record<string, MatchTimings> = {};
        const matchPeriods = [...this.competition.matchPeriods].sort(
            (a, b) => a.startsAt.getTime() - b.startsAt.getTime()
        );
        const matches = [...this.competition.matches.sort((a, b) => a.sequenceNumber - b.sequenceNumber)];

        const pauses = [...this.competition.pauses.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())];
        const offsets = [...this.competition.offsets.sort((a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime())];

        let matchPeriod = matchPeriods.shift();
        if (!matchPeriod) return timings;

        let timeAccumulator = DateTime.fromJSDate(matchPeriod.startsAt);
        for (const match of matches) {
            const baseMatchEndTime = timeAccumulator.plus({
                seconds: this.competition.game.matchDuration + this.competition.game.defaultMatchSpacing,
            });

            // Apply pauses
            let pause = pauses[0];
            while (pause && DateTime.fromJSDate(pause.startsAt) < baseMatchEndTime) {
                const pauseStartsAt = DateTime.fromJSDate(pause.startsAt);
                const pauseEndsAt = pause.endsAt ? DateTime.fromJSDate(pause.endsAt) : null;
                if (pauseEndsAt) {
                    pauses.shift();
                    timeAccumulator = timeAccumulator.plus({
                        seconds: Math.abs(pauseStartsAt.diff(pauseEndsAt).as("seconds")),
                    });
                } else if (!pauseEndsAt) break;

                pause = pauses[0];
            }

            // Apply offsets
            let offset = offsets[0];
            while (offset && DateTime.fromJSDate(offset.appliesFrom) < baseMatchEndTime) {
                offsets.shift();
                timeAccumulator = timeAccumulator.minus({ seconds: offset.offset });

                offset = offsets[0];
            }

            timings[match.id] = {
                startsAt: timeAccumulator,
                endsAt: timeAccumulator.plus({
                    seconds: this.competition.game.matchDuration,
                }),
                stagingOpensAt: timeAccumulator.minus({ seconds: this.competition.game.stagingOpenOffset }),
                stagingClosesAt: timeAccumulator.minus({ seconds: this.competition.game.stagingCloseOffset }),
            };

            timeAccumulator = timeAccumulator.plus({
                seconds: this.competition.game.defaultMatchSpacing + this.competition.game.matchDuration,
            });
        }

        return timings;
    }

    public isPaused() {
        return this.competition.pauses.some((pause) => pause.endsAt === null);
    }

    public now() {
        if (this.isPaused()) {
            return DateTime.fromJSDate(this.competition.pauses.find((pause) => pause.endsAt === null)!.startsAt);
        }

        return DateTime.now();
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

