import { createFileRoute } from "@tanstack/react-router";
import SplitDisplay from "../../components/display/SplitDisplay";

export const Route = createFileRoute("/display/next-matches")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SplitDisplay>
            <h1 className="text-white text-4xl font-bold">Next matches</h1>

            <div className="grid grid-cols-5 gap-4 mt-8">
                {[...Array(30).keys()].map((i) => (
                    <div key={i} className="p-4">
                        <h1 className="text-white text-2xl font-bold">T{(i + 1).toString().padStart(2, "0")}</h1>
                        <h2 className="text-white text-lg font-medium">
                            Next match: <span className="font-mono font-normal">14:35</span>
                        </h2>
                    </div>
                ))}
            </div>

            <div className="p-4 absolute bottom-0">
                <h1 className="text-white text-2xl font-semibold">
                    The times shown are the times at which staging closes for each match.
                </h1>
            </div>
        </SplitDisplay>
    );
}

