import type { Game } from "@livecomp/server/src/db/schema/games";
import type { MatchPeriod, Match } from "@livecomp/server/src/db/schema/matches";
import { DateTime } from "luxon";
import type { MatchStatus } from "./types";

interface MatchTimings {
    start: Date;
    end: Date;
    stagingOpen: Date;
    stagingClose: Date;
}

export class MatchClock {
    constructor(
        private readonly game: Game,
        private readonly matchPeriod: MatchPeriod & { matches: Match[] }
    ) {}

    public computeMatchTimings() {
        const timings: Record<string, MatchTimings> = {};
        let currentTime = DateTime.fromJSDate(this.matchPeriod.startsAt);

        for (const match of this.matchPeriod.matches) {
            timings[match.id] = {
                start: currentTime.toJSDate(),
                end: currentTime.plus({ seconds: this.game.matchDuration }).toJSDate(),
                stagingOpen: currentTime.minus({ seconds: this.game.stagingOpenOffset }).toJSDate(),
                stagingClose: currentTime.minus({ seconds: this.game.stagingCloseOffset }).toJSDate(),
            };

            currentTime = currentTime.plus({ seconds: this.game.matchDuration + this.game.defaultMatchSpacing });
        }

        return timings;
    }

    public getMatchStatus(timings: MatchTimings): MatchStatus {
        const now = DateTime.now().toJSDate();

        if (now >= timings.stagingOpen && now < timings.stagingClose) {
            return "Staging";
        }

        if (now >= timings.start && now < timings.end) {
            return "InProgress";
        }

        if (now >= timings.end) {
            return "Finished";
        }

        return "NotStarted";
    }

    public getCurrentMatchId(timings?: Record<string, MatchTimings>) {
        if (!timings) timings = this.computeMatchTimings();

        const now = DateTime.now().toJSDate();

        for (const matchId in timings) {
            if (now >= timings[matchId].start && now < timings[matchId].end) return matchId;
        }

        return undefined;
    }
}

