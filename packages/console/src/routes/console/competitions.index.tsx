import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout, Header, SpaceBetween, Button } from "@cloudscape-design/components";

export const Route = createFileRoute("/console/competitions/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage competitions",
    }),
});

function RouteComponent() {
    return (
        <ContentLayout
            header={
                <Header
                    variant="h1"
                    actions={
                        <SpaceBetween size="xs">
                            <Button variant="primary">Create</Button>
                        </SpaceBetween>
                    }
                >
                    Manage competitions
                </Header>
            }
        ></ContentLayout>
    );
}

