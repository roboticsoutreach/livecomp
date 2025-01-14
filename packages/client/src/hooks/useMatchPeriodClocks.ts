import { Game } from "@livecomp/server/src/db/schema/games";
import { Match, MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import { useMemo } from "react";
import { MatchPeriodClock } from "@livecomp/utils";

export default function useMatchPeriodClocks<T extends Match>(
    matchPeriods: ((MatchPeriod & { matches: T[] }) | null | undefined)[],
    game: Game | undefined
): Record<string, MatchPeriodClock<T> | undefined> {
    return useMemo(() => {
        return Object.fromEntries(
            matchPeriods
                .map((matchPeriod) => {
                    if (!matchPeriod || !game) {
                        return undefined;
                    }

                    return [matchPeriod.id, new MatchPeriodClock(matchPeriod, game)];
                })
                .filter((clock) => clock !== undefined)
        );
    }, [matchPeriods, game]);
}

