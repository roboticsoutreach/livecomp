import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
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
                        {[...Array(6).keys()].map((t) => (
                            <tr>
                                <td>T0{t}</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SplitDisplay>
    );
}

