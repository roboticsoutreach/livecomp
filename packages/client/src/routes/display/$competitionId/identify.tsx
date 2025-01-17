import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/display/$competitionId/identify")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/display/$competitionId/identify"!</div>;
}

