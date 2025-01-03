import type { Game } from "@livecomp/server/src/db/schema/games";
import type { MatchPeriod, Match } from "@livecomp/server/src/db/schema/matches";
import { DateTime } from "luxon";
import type { MatchStatus } from "./types";

interface MatchTimings {
    absoluteTimes: {
        start: Date;
        end: Date;
        stagingOpen: Date;
        stagingClose: Date;
    };

    cusorPositions: {
        start: number;
        end: number;
        stagingOpen: number;
        stagingClose: number;
    };
}

export class MatchPeriodClock {
    constructor(
        private game: Game,
        private matchPeriod: MatchPeriod & { matches: Match[] }
    ) {}

    public setGame(game: Game) {
        this.game = game;
    }

    public setMatchPeriod(matchPeriod: MatchPeriod & { matches: Match[] }) {
        this.matchPeriod = matchPeriod;
    }

    public computeMatchTimings() {
        const timings: Record<string, MatchTimings> = {};
        let timeAccumulator = DateTime.fromJSDate(this.matchPeriod.startsAt);
        let cursorAccumulator = 0;

        for (const match of this.matchPeriod.matches) {
            timings[match.id] = {
                absoluteTimes: {
                    start: timeAccumulator.toJSDate(),
                    end: timeAccumulator.plus({ seconds: this.game.matchDuration }).toJSDate(),
                    stagingOpen: timeAccumulator.minus({ seconds: this.game.stagingOpenOffset }).toJSDate(),
                    stagingClose: timeAccumulator.minus({ seconds: this.game.stagingCloseOffset }).toJSDate(),
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
        }

        return timings;
    }

    public getMatchStatus(timings: MatchTimings): MatchStatus {
        const cursor = this.matchPeriod.cursorPosition;

        if (cursor >= timings.cusorPositions.stagingOpen && cursor < timings.cusorPositions.stagingClose) {
            return "Staging";
        }

        if (cursor >= timings.cusorPositions.start && cursor < timings.cusorPositions.end) {
            return "InProgress";
        }

        if (cursor >= timings.cusorPositions.end) {
            return "Finished";
        }

        return "NotStarted";
    }

    public getCurrentMatchId(timings?: Record<string, MatchTimings>) {
        if (!timings) timings = this.computeMatchTimings();

        const cursor = this.matchPeriod.cursorPosition;

        for (const matchId in timings) {
            if (cursor >= timings[matchId].cusorPositions.start && cursor < timings[matchId].cusorPositions.end)
                return matchId;
        }

        return undefined;
    }
}

