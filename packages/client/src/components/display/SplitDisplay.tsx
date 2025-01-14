import { Fragment, PropsWithChildren, useMemo } from "react";
import useDateTime from "../../hooks/useDate";
import { api } from "../../utils/trpc";
import { array } from "../../utils/array";
import { AppRouterOutput } from "@livecomp/server";
import useMatchPeriodClock from "../../hooks/useMatchPeriodClock";
import MatchBox from "./MatchBox";
import DisplayOverlay from "./DisplayOverlay";
import useMatchPeriodClocks from "../../hooks/useMatchPeriodClocks";
import { DateTime } from "luxon";

export default function SplitDisplay({
    competition,
    children,
}: { competition?: AppRouterOutput["competitions"]["fetchById"] } & PropsWithChildren) {
    const time = useDateTime();

    const { data: teams } = api.teams.fetchAll.useQuery({ filters: { competitionId: competition?.id ?? "" } });
    const chunkedTeams = useMemo(() => [...array.chunk(teams ?? [], 3)], [teams]);

    const { data: matchPeriod } = api.matchPeriods.fetchActiveByCompetitionId.useQuery({
        competitionId: competition?.id ?? "",
    });
    const matchPeriodClock = useMatchPeriodClock(matchPeriod, competition?.game);
    const currentMatch = useMemo(() => {
        const currentMatchId = matchPeriodClock?.getCurrentMatchId();

        if (currentMatchId) {
            return matchPeriod?.matches.find((match) => match.id === currentMatchId);
        }

        return undefined;
    }, [matchPeriodClock, matchPeriod]);
    const currentMatchStart = useMemo(
        () =>
            currentMatch
                ? matchPeriodClock?.getMatchTimings(currentMatch.id).absoluteTimes.start.toFormat("HH:mm:ss")
                : undefined,
        [currentMatch, matchPeriodClock]
    );

    const nextMatch = useMemo(() => {
        const nextMatchId = matchPeriodClock?.getNextMatchId();

        if (nextMatchId) {
            return matchPeriod?.matches.find((match) => match.id === nextMatchId);
        }

        return undefined;
    }, [matchPeriodClock, matchPeriod]);
    const nextMatchStart = useMemo(
        () =>
            nextMatch
                ? matchPeriodClock?.getMatchTimings(nextMatch.id).absoluteTimes.start.toFormat("HH:mm:ss")
                : undefined,
        [nextMatch, matchPeriodClock]
    );

    const { data: matches } = api.matches.fetchAll.useQuery(
        { filters: { competitionId: competition?.id } },
        { enabled: !!competition }
    );

    const { data: matchPeriods } = api.matchPeriods.fetchAll.useQuery(
        {
            filters: { competitionId: competition?.id },
            include: { matches: true },
        },
        { enabled: !!competition }
    );
    const matchPeriodClocks = useMatchPeriodClocks(matchPeriods ?? [], competition?.game);

    const matchTimings = useMemo(
        () =>
            Object.entries(
                Object.values(matchPeriodClocks)
                    .filter((clock) => !!clock)
                    .map((clock) => clock?.getTimings())
                    .reduce((acc, timings) => ({ ...acc, ...timings }), {})
            ),
        [matchPeriodClocks]
    );

    const nextMatchTimes = useMemo<Record<string, DateTime>>(() => {
        const now = DateTime.now();

        return Object.fromEntries(
            (teams ?? [])
                .map((team) => {
                    for (const [matchId, timings] of matchTimings) {
                        const match = (matches ?? []).find((match) => match.id === matchId);
                        if (!match) continue;
                        if (!match.assignments.some((assignment) => assignment.teamId === team.id)) continue;

                        if (
                            match.matchPeriod.status === "inProgress" &&
                            match.matchPeriod.cursorPosition < timings.cusorPositions.stagingClose
                        ) {
                            return [team.id, timings.absoluteTimes.stagingClose];
                        } else if (now < timings.absoluteTimes.stagingClose) {
                            return [team.id, timings.absoluteTimes.stagingClose];
                        }
                    }

                    return undefined;
                })
                .filter((entry) => !!entry)
        );
    }, [matchTimings, matches, teams]);

    return (
        <div className="w-screen h-screen flex flex-row">
            {matchPeriod?.status === "paused" && (
                <DisplayOverlay>
                    <h1 className="text-center text-white text-4xl font-mono">The competition is currently paused.</h1>
                </DisplayOverlay>
            )}

            <div className="w-2/3 h-full p-4">{children}</div>
            <div className="w-1/3 h-full border-l-2 flex flex-col">
                <div className="text-white text-3xl p-4 font-bold bg-slate-600">Next matches</div>

                <table className="w-full border-b-2 border-white">
                    <thead className="bg-slate-600">
                        <tr>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {chunkedTeams.map((chunk, i) => {
                            const shadeLeft = i % 2 === 0;

                            return (
                                <tr key={i}>
                                    {chunk.map((team) => {
                                        return (
                                            <Fragment key={team.id}>
                                                <td
                                                    className={`p-2 text-lg text-white ${
                                                        shadeLeft ? "bg-slate-800" : ""
                                                    }`}
                                                >
                                                    {team.shortName}
                                                </td>
                                                <td
                                                    className={`p-2 text-lg text-white ${
                                                        !shadeLeft ? "bg-slate-800" : ""
                                                    }`}
                                                >
                                                    {nextMatchTimes[team.id]?.toLocaleString(
                                                        DateTime.TIME_24_WITH_SECONDS
                                                    ) ?? "-"}
                                                </td>
                                            </Fragment>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <table className="w-full my-auto">
                    <tbody>
                        <tr>
                            <td className="w-1/2">
                                <h1 className="text-white font-bold text-3xl p-4 text-center">
                                    Current
                                    <br />
                                    match
                                </h1>
                            </td>
                            <td className="w-1/2">
                                <MatchBox
                                    matchName={currentMatch?.name ?? "-"}
                                    matchStart={currentMatchStart ?? "-"}
                                    startingZones={competition?.game.startingZones ?? []}
                                    assignments={currentMatch?.assignments ?? []}
                                    placeholder="-"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-full my-auto">
                    <tbody>
                        <tr>
                            <td className="w-1/2">
                                <h1 className="text-white font-bold text-3xl p-4 text-center">
                                    Next
                                    <br />
                                    match
                                </h1>
                            </td>
                            <td className="w-1/2">
                                <MatchBox
                                    matchName={nextMatch?.name ?? "???"}
                                    matchStart={nextMatchStart ?? "???"}
                                    startingZones={competition?.game.startingZones ?? []}
                                    assignments={nextMatch?.assignments ?? []}
                                    placeholder="???"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-white text-3xl p-4 font-semibold bg-slate-600 border-t-2 border-white">
                    <span className="float-start">Time</span>
                    <span className="float-end font-mono">{time.toFormat("HH:mm:ss")}</span>
                </div>
            </div>
        </div>
    );
}

