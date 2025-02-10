import { useMemo } from "react";
import { CompetitionClock } from "@livecomp/utils";
import { AppRouterOutput } from "@livecomp/server";

export default function useCompetitionClock(competition: AppRouterOutput["competitions"]["fetchById"] | undefined) {
    return useMemo(() => {
        if (!competition) {
            return undefined;
        }

        return new CompetitionClock(competition);
    }, [competition]);
}

