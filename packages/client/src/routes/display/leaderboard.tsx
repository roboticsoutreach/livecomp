import { createFileRoute } from "@tanstack/react-router";
import SplitDisplay from "../../components/display/SplitDisplay";

export const Route = createFileRoute("/display/leaderboard")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SplitDisplay>
            <h1 className="text-white text-4xl font-bold">Leaderboard</h1>
        </SplitDisplay>
    );
}

