import { createFileRoute } from "@tanstack/react-router";
import SplitDisplay from "../../components/display/SplitDisplay";
import "../../styles/display/leaderboard.css";

export const Route = createFileRoute("/display/leaderboard")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SplitDisplay>
            <h1 className="text-white text-4xl font-bold">Leaderboard</h1>

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

