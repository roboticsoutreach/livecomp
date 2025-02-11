import { CompetitionClock } from "@livecomp/utils";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

export default function useDateTime(competitionClock?: CompetitionClock) {
    const getNow = useMemo(
        () => (competitionClock ? () => competitionClock.now() : () => DateTime.now()),
        [competitionClock]
    );

    const [now, setNow] = useState(getNow());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(getNow());
        }, 100);

        return () => clearInterval(interval);
    }, [getNow]);

    return now;
}

