import type { Game } from "@livecomp/server/src/db/schema/games";
import type { MatchPeriod, Match } from "@livecomp/server/src/db/schema/matches";
import { DateTime } from "luxon";
import type { MatchStatus } from "./types";

interface MatchTimings {
    absoluteTimes: {
        start: DateTime;
        end: DateTime;
        stagingOpen: DateTime;
        stagingClose: DateTime;
    };

    cusorPositions: {
        start: number;
        end: number;
        stagingOpen: number;
        stagingClose: number;
    };
}

export class MatchPeriodClock<T extends Match> {
    private timings: Record<string, MatchTimings>;

    constructor(
        private matchPeriod: MatchPeriod & { matches: T[] },
        private game: Game
    ) {
        this.timings = this.computeMatchTimings();
    }

    public getTimings() {
        return this.timings;
    }

    public setGame(game: Game) {
        this.game = game;
        this.timings = this.computeMatchTimings();
    }

    public setMatchPeriod(matchPeriod: MatchPeriod & { matches: T[] }) {
        this.matchPeriod = matchPeriod;
    }

    public computeMatchTimings() {
        const timings: Record<string, MatchTimings> = {};
        let timeAccumulator =
            this.matchPeriod.status === "notStarted"
                ? DateTime.fromJSDate(this.matchPeriod.startsAt)
                : DateTime.now().minus({ seconds: this.matchPeriod.cursorPosition });
        let cursorAccumulator = 0;

        for (const match of this.matchPeriod.matches.sort((a, b) => a.sequenceNumber - b.sequenceNumber)) {
            timings[match.id] = {
                absoluteTimes: {
                    start: timeAccumulator,
                    end: timeAccumulator.plus({ seconds: this.game.matchDuration }),
                    stagingOpen: timeAccumulator.minus({ seconds: this.game.stagingOpenOffset }),
                    stagingClose: timeAccumulator.minus({ seconds: this.game.stagingCloseOffset }),
                },

                cusorPositions: {
                    start: cursorAccumulator,
                    end: cursorAccumulator + this.game.matchDuration,
                    stagingOpen: cursorAccumulator - this.game.stagingOpenOffset,
                    stagingClose: cursorAccumulator - this.game.stagingCloseOffset,
                },
            };

            timeAccumulator = timeAccumulator.plus({
                seconds: this.game.matchDuration + this.game.defaultMatchSpacing,
            });
            cursorAccumulator += this.game.matchDuration + this.game.defaultMatchSpacing;
        }

        return timings;
    }

    public getEndCursorPosition() {
        return Object.values(this.timings)
            .map((timings) => timings.cusorPositions.end)
            .sort((a, b) => b - a)[0];
    }

    public getMatchTimings(matchId: string) {
        return this.timings[matchId];
    }

    public getMatchStatus(matchId: string): MatchStatus {
        const timings = this.timings[matchId];
        const cursor = this.matchPeriod.cursorPosition;

        if (cursor >= timings.cusorPositions.stagingOpen && cursor < timings.cusorPositions.stagingClose) {
            return "staging";
        }

        if (cursor >= timings.cusorPositions.start && cursor < timings.cusorPositions.end) {
            return "inProgress";
        }

        if (cursor >= timings.cusorPositions.end) {
            return "finished";
        }

        return "notStarted";
    }

    public getPreviousMatchId(timings?: Record<string, MatchTimings>) {
        if (!timings) timings = this.timings;

        const cursor = this.matchPeriod.cursorPosition;

        for (const [matchId, matchTimings] of Object.entries(timings).sort(
            ([, a], [, b]) => b.cusorPositions.start - a.cusorPositions.start
        )) {
            if (cursor >= matchTimings.cusorPositions.end) return matchId;
        }

        return undefined;
    }

    public getCurrentMatchId(timings?: Record<string, MatchTimings>) {
        if (!timings) timings = this.timings;

        const cursor = this.matchPeriod.cursorPosition;

        for (const [matchId, matchTimings] of Object.entries(timings).sort(
            ([, a], [, b]) => a.cusorPositions.start - b.cusorPositions.start
        )) {
            if (cursor >= matchTimings.cusorPositions.start && cursor < matchTimings.cusorPositions.end) return matchId;
        }

        return undefined;
    }

    public getNextMatchId(timings?: Record<string, MatchTimings>) {
        if (!timings) timings = this.timings;

        const cursor = this.matchPeriod.cursorPosition;

        for (const [matchId, matchTimings] of Object.entries(timings).sort(
            ([, a], [, b]) => a.cusorPositions.start - b.cusorPositions.start
        )) {
            if (cursor < matchTimings.cusorPositions.start) return matchId;
        }

        return undefined;
    }
}

