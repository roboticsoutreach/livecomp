import { createFileRoute } from "@tanstack/react-router";
import SplitDisplay from "../../components/display/SplitDisplay";

export const Route = createFileRoute("/display/scores")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SplitDisplay>
            <h1 className="text-white text-4xl font-bold">Scores</h1>

            <div className="grid grid-cols-5 gap-4">
                {[...Array(30).keys()].map((i) => (
                    <div key={i} className="p-4">
                        <h1 className="text-white text-2xl font-bold">T{(i + 1).toString().padStart(2, "0")}</h1>
                        <h2 className="text-white text-lg font-medium">
                            League Points: <span className="font-mono font-normal">0</span>
                        </h2>
                        <h2 className="text-white text-lg font-medium">
                            Game Points: <span className="font-mono font-normal">0</span>
                        </h2>
                    </div>
                ))}
            </div>
        </SplitDisplay>
    );
}

