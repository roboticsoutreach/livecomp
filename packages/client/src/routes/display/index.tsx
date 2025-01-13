import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "../../utils/trpc";

export const Route = createFileRoute("/display/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: competitions } = api.competitions.fetchAll.useQuery();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 w-screen p-4">
            {competitions &&
                competitions.map((competition) => (
                    <div key={competition.id} className="border border-white p-4">
                        <h4 className="text-white text-2xl font-bold mb-4">{competition.name}</h4>

                        <ul className="list-disc list-inside">
                            <li className="text-blue-500 font-semibold">
                                <Link
                                    to={`/display/$competitionId/leaderboard`}
                                    params={{ competitionId: competition.id }}
                                >
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
        </div>
    );
}

