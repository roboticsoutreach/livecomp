import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import SplitDisplay from "../../../components/display/SplitDisplay";
import { api } from "../../../utils/trpc";

export const Route = createFileRoute("/display/$competitionShortName/leaderboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const { competitionShortName } = Route.useParams();

    useEffect(() => {
        import("../../../styles/display/leaderboard.css");
    }, []);
    const { data: competition } = api.competitions.fetchByShortName.useQuery({ shortName: competitionShortName });
    const { data: teams } = api.teams.fetchAll.useQuery(
        { filters: { competitionId: competition?.id ?? "" } },
        { enabled: !!competition }
    );
    const { data: rawScores } = api.teams.fetchAllScores.useQuery(
        { competitionId: competition?.id ?? "" },
        { enabled: !!competition }
    );

    const scores = useMemo(
        () =>
            Object.entries(rawScores ?? [])
                .sort((a, b) => b[1].leaguePoints - a[1].leaguePoints)
                .slice(0, 10),
        [rawScores]
    );

    return (
        <SplitDisplay competition={competition}>
            <h1 className="text-white text-4xl font-bold">Leaderboard - {competition?.name}</h1>

            <div className="w-full my-24 flex flex-col justify-items-center">
                <table className="w-full mx-auto my-auto">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>League Points</th>
                            <th>Game Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(([teamId, points]) => (
                            <tr key={teamId}>
                                <td>{teams?.find((team) => team.id === teamId)?.shortName}</td>
                                <td>{points.leaguePoints}</td>
                                <td>{points.gamePoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SplitDisplay>
    );
}

