import { createFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import { api } from "../../../utils/trpc";

export const Route = createFileRoute("/display/$competitionId/identify")({
    component: RouteComponent,
});

function RouteComponent() {
    const [cookies] = useCookies(["display-id"]);
    const displayId = cookies["display-id"];

    const { data: display } = api.displays.fetchById.useQuery({ id: displayId }, { enabled: !!displayId });

    return (
        <div className="flex flex-col justify-center h-screen">
            <h1 className="text-center text-8xl text-white font-bold my-4">{display?.name ?? "???"}</h1>
            <h1 className="text-center text-7xl text-white font-mono my-4">{display?.identifier ?? "???"}</h1>
        </div>
    );
}

