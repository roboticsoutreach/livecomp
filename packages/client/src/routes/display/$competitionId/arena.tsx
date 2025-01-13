import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { api } from "../../../utils/trpc";
import { useMemo } from "react";
import useMatchPeriodClock from "../../../hooks/useMatchPeriodClock";
import { formatClock } from "../../../utils/clock";
import useDateTime from "../../../hooks/useDate";

const searchSchema = z.object({
    startingZoneId: z.string(),
});

export const Route = createFileRoute("/display/$competitionId/arena")({
    component: RouteComponent,
    validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
    const { competitionId } = Route.useParams();
    const { startingZoneId } = Route.useSearch();

    useDateTime();

    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });
    const { data: matchPeriod } = api.matchPeriods.fetchActiveByCompetitionId.useQuery({
        competitionId,
        nextIfNotFound: true,
    });

    const { data: startingZone } = api.startingZones.fetchById.useQuery({ id: startingZoneId });
    const { data: startingZones } = api.startingZones.fetchAll.useQuery(
        { filters: { gameId: startingZone?.gameId ?? "" } },
        { enabled: !!startingZone }
    );

    const otherStartingZones = useMemo(
        () => (startingZones ?? []).filter((zone) => zone.id !== startingZoneId),
        [startingZones, startingZoneId]
    );
    const shouldShowOtherZones = useMemo(() => otherStartingZones.length === 3, [otherStartingZones]);

    const matchPeriodClock = useMatchPeriodClock(matchPeriod, competition?.game);

    const currentMatch = useMemo(() => {
        const currentMatchId = matchPeriodClock?.getCurrentMatchId();
        if (!currentMatchId) return undefined;

        return matchPeriod?.matches.find((match) => match.id === currentMatchId);
    }, [matchPeriodClock, matchPeriod]);

    const currentAssignment = useMemo(() => {
        if (!currentMatch) return undefined;

        return currentMatch.assignments.find((assignment) => assignment.startingZoneId === startingZoneId);
    }, [currentMatch, startingZoneId]);

    const nextMatch = useMemo(() => {
        const nextMatchId = matchPeriodClock?.getNextMatchId();
        if (!nextMatchId) return undefined;

        return matchPeriod?.matches.find((match) => match.id === nextMatchId);
    }, [matchPeriodClock, matchPeriod]);

    const nextAssignment = useMemo(() => {
        if (!nextMatch) return undefined;

        return nextMatch.assignments.find((assignment) => assignment.startingZoneId === startingZoneId);
    }, [nextMatch, startingZoneId]);

    return (
        <div className="w-screen h-screen flex">
            <div className="w-1/4 h-full" style={{ backgroundColor: startingZone?.color ?? "red" }}></div>
            <div className="w-2/4 h-full flex flex-col justify-center relative">
                {currentMatch && matchPeriod && matchPeriodClock && (
                    <>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-8xl text-center">{currentMatch.name}</h1>
                        </div>
                        <div className="my-16">
                            <h1 className="text-white font-bold font-mono text-8xl text-center">
                                {formatClock(
                                    matchPeriodClock.getMatchTimings(currentMatch.id).cusorPositions.end -
                                        matchPeriod.cursorPosition
                                )}
                            </h1>
                        </div>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-8xl text-center">
                                {currentAssignment?.team?.shortName}
                            </h1>
                            <h2 className="text-white font-semibold text-5xl text-center">
                                {currentAssignment?.team?.name}
                            </h2>
                        </div>
                    </>
                )}

                {!currentMatch && nextMatch && matchPeriod && matchPeriodClock && (
                    <>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-8xl text-center">{nextMatch.name}</h1>
                        </div>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-5xl text-center mb-4">Starting in</h1>
                            <h1 className="text-white font-bold font-mono text-8xl text-center">
                                {formatClock(
                                    matchPeriod.status === "notStarted"
                                        ? matchPeriodClock
                                              .getMatchTimings(nextMatch.id)
                                              .absoluteTimes.start.diffNow()
                                              .as("seconds")
                                        : matchPeriodClock.getMatchTimings(nextMatch.id).cusorPositions.start -
                                              matchPeriod.cursorPosition
                                )}
                            </h1>
                        </div>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-8xl text-center">
                                {nextAssignment?.team?.shortName}
                            </h1>
                            <h2 className="text-white font-semibold text-5xl text-center">
                                {nextAssignment?.team?.name}
                            </h2>
                        </div>
                    </>
                )}

                {shouldShowOtherZones && (
                    <div className="absolute bottom-0 left-0 right-0 h-1/5 flex flex-row">
                        <div className="w-1/3 h-full flex flex-row">
                            <div className="w-1/4 h-full bg-green-600"></div>
                            <div className="w-2/4 h-full flex flex-col justify-center">
                                <h1 className="text-white font-bold text-3xl text-center">ABC</h1>
                            </div>
                            <div className="w-1/4 h-full bg-green-600"></div>
                        </div>
                        <div className="w-1/3 h-full flex flex-row">
                            <div className="w-1/4 h-full bg-yellow-600"></div>
                            <div className="w-2/4 h-full flex flex-col justify-center">
                                <h1 className="text-white font-bold text-3xl text-center">XYZ</h1>
                            </div>
                            <div className="w-1/4 h-full bg-yellow-600"></div>
                        </div>
                        <div className="w-1/3 h-full flex flex-row">
                            <div className="w-1/4 h-full bg-pink-600"></div>
                            <div className="w-2/4 h-full flex flex-col justify-center">
                                <h1 className="text-white font-bold text-3xl text-center">TUV</h1>
                            </div>
                            <div className="w-1/4 h-full bg-pink-600"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-1/4 h-full" style={{ backgroundColor: startingZone?.color ?? "red" }}></div>
        </div>
    );
}

