import { createFileRoute, Outlet } from "@tanstack/react-router";
import DisplayRoot from "../components/display/DisplayRoot";
import DisplayController from "../components/display/DisplayController";

export const Route = createFileRoute("/display")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Livecomp Displays",
    }),
});

function RouteComponent() {
    return (
        <>
            <DisplayController />
            <DisplayRoot>
                <Outlet />
            </DisplayRoot>
        </>
    );
}

