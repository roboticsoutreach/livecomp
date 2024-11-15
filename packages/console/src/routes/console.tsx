import { createFileRoute, Outlet } from "@tanstack/react-router";
import LivecompLayout from "../components/layout/LivecompLayout";

export const Route = createFileRoute("/console")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <LivecompLayout>
            <Outlet />
        </LivecompLayout>
    );
}

