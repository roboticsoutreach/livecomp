import { createFileRoute, Outlet } from "@tanstack/react-router";
import DisplayRoot from "../components/display/DisplayRoot";

export const Route = createFileRoute("/display")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Livecomp Displays",
    }),
});

function RouteComponent() {
    return (
        <DisplayRoot>
            <Outlet />
        </DisplayRoot>
    );
}

