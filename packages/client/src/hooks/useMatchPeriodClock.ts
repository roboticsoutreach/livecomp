import { Game } from "@livecomp/server/src/db/schema/games";
import { Match, MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import { useMemo } from "react";
import { MatchPeriodClock } from "@livecomp/utils";

export default function useMatchPeriodClock<T extends Match>(
    matchPeriod: (MatchPeriod & { matches: T[] }) | null | undefined,
    game: Game | undefined
) {
    return useMemo(() => {
        if (!matchPeriod || !game) {
            return undefined;
        }

        return new MatchPeriodClock(matchPeriod, game);
    }, [matchPeriod, game]);
}

