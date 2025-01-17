import { Header, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import DisplaysTable from "../../../components/console/displays/DisplaysTable";

export const Route = createFileRoute("/console/competitions/$competitionId/displays")({
    component: RouteComponent,
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: displays } = api.displays.fetchAll.useQuery({ filters: { competitionId } });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">Displays</Header>

            <DisplaysTable displays={displays} displaysPending={!displays} competitionId={competitionId} />
        </SpaceBetween>
    );
}

