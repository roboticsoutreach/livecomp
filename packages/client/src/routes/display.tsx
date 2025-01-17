import { createFileRoute, Outlet } from "@tanstack/react-router";
import DisplayRoot from "../components/display/DisplayRoot";
import DisplayController from "../components/display/DisplayController";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const searchSchema = z.object({
    identifier: z.string().optional(),
});

export const Route = createFileRoute("/display")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Livecomp Displays",
    }),
    validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
    const { identifier } = Route.useSearch();

    return (
        <>
            {identifier && <DisplayController identifier={identifier} />}
            <DisplayRoot>
                <Outlet />
            </DisplayRoot>
        </>
    );
}

