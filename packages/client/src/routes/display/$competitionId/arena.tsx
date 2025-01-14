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
    beforeLoad: () => ({
        title: "Livecomp Displays",
    }),
    validateSearch: zodValidator(searchSchema),
});

enum DisplayMode {
    PRE_MATCH = "PRE_MATCH",
    MATCH_START_COUNTDOWN = "MATCH_START_COUNTDOWN",
    MATCH_IN_PROGRESS = "MATCH_IN_PROGRESS",
    MATCH_END_COUNTDOWN = "MATCH_END_COUNTDOWN",
    POST_MATCH = "POST_MATCH",
}

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

    const previousMatch = useMemo(() => {
        const previousMatchId = matchPeriodClock?.getPreviousMatchId();
        if (!previousMatchId) return undefined;

        return matchPeriod?.matches.find((match) => match.id === previousMatchId);
    }, [matchPeriodClock, matchPeriod]);

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

    const displayMode: DisplayMode | undefined = useMemo(() => {
        if (matchPeriod && matchPeriodClock) {
            const cursor = matchPeriod.cursorPosition;

            if (currentMatch) {
                if (matchPeriodClock.getMatchTimings(currentMatch.id).cusorPositions.end - cursor <= 5) {
                    return DisplayMode.MATCH_END_COUNTDOWN;
                } else {
                    return DisplayMode.MATCH_IN_PROGRESS;
                }
            } else {
                if (
                    previousMatch &&
                    cursor <= matchPeriodClock.getMatchTimings(previousMatch.id).cusorPositions.end + 10
                ) {
                    return DisplayMode.POST_MATCH;
                } else if (nextMatch) {
                    if (
                        matchPeriod.status === "inProgress" &&
                        cursor >= matchPeriodClock.getMatchTimings(nextMatch.id).cusorPositions.start - 10
                    ) {
                        return DisplayMode.MATCH_START_COUNTDOWN;
                    } else {
                        return DisplayMode.PRE_MATCH;
                    }
                }
            }
        }

        return undefined;
    }, [currentMatch, matchPeriod, matchPeriodClock, nextMatch, previousMatch]);

    return (
        <div className="w-screen h-screen flex">
            <div className="w-1/4 h-full" style={{ backgroundColor: startingZone?.color ?? "red" }}></div>
            <div className="w-2/4 h-full flex flex-col justify-center relative">
                {displayMode === DisplayMode.PRE_MATCH && nextMatch && matchPeriod && matchPeriodClock && (
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

                        {shouldShowOtherZones && (
                            <div className="absolute bottom-0 left-0 right-0 h-1/5 flex flex-row">
                                {otherStartingZones.map((zone) => (
                                    <div key={zone.id} className="w-1/3 h-full flex flex-row">
                                        <div className="w-1/4 h-full" style={{ backgroundColor: zone.color }}></div>
                                        <div className="w-2/4 h-full flex flex-col justify-center">
                                            <h1 className="text-white font-bold text-3xl text-center">
                                                {
                                                    nextMatch.assignments.find(
                                                        (assignment) => assignment.startingZoneId === zone.id
                                                    )?.team?.shortName
                                                }
                                            </h1>
                                        </div>
                                        <div className="w-1/4 h-full" style={{ backgroundColor: zone.color }}></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {displayMode === DisplayMode.MATCH_START_COUNTDOWN && nextMatch && matchPeriod && matchPeriodClock && (
                    <>
                        <div>
                            <h1 className="text-white font-bold font-mono text-9xl text-center">
                                {matchPeriodClock.getMatchTimings(nextMatch.id).cusorPositions.start -
                                    matchPeriod.cursorPosition}
                            </h1>
                        </div>
                    </>
                )}

                {displayMode === DisplayMode.MATCH_IN_PROGRESS && currentMatch && matchPeriodClock && matchPeriod && (
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

                        {shouldShowOtherZones && (
                            <div className="absolute bottom-0 left-0 right-0 h-1/5 flex flex-row">
                                {otherStartingZones.map((zone) => (
                                    <div key={zone.id} className="w-1/3 h-full flex flex-row">
                                        <div className="w-1/4 h-full" style={{ backgroundColor: zone.color }}></div>
                                        <div className="w-2/4 h-full flex flex-col justify-center">
                                            <h1 className="text-white font-bold text-3xl text-center">
                                                {
                                                    currentMatch.assignments.find(
                                                        (assignment) => assignment.startingZoneId === zone.id
                                                    )?.team?.shortName
                                                }
                                            </h1>
                                        </div>
                                        <div className="w-1/4 h-full" style={{ backgroundColor: zone.color }}></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {displayMode === DisplayMode.MATCH_END_COUNTDOWN && currentMatch && matchPeriod && matchPeriodClock && (
                    <>
                        <div>
                            <h1 className="text-white font-bold font-mono text-9xl text-center">
                                {matchPeriodClock.getMatchTimings(currentMatch.id).cusorPositions.end -
                                    matchPeriod.cursorPosition}
                            </h1>
                        </div>
                    </>
                )}

                {displayMode === DisplayMode.POST_MATCH && previousMatch && (
                    <>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-6xl text-center">{previousMatch.name}</h1>
                        </div>
                        <div className="my-16">
                            <h1 className="text-white font-bold text-8xl text-center">Match ended</h1>
                        </div>
                    </>
                )}
            </div>
            <div className="w-1/4 h-full" style={{ backgroundColor: startingZone?.color ?? "red" }}></div>
        </div>
    );
}

