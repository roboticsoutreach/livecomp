import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout, Header, SpaceBetween, Table } from "@cloudscape-design/components";
import CreateCompetitionModalButton from "../../components/console/competitions/CreateCompetitionModalButton";
import { api } from "../../utils/trpc";
import { useCollection } from "@cloudscape-design/collection-hooks";
import DeleteCompetitionButton from "../../components/console/competitions/DeleteCompetitionButton";

export const Route = createFileRoute("/console/competitions/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage competitions",
    }),
});

function RouteComponent() {
    const { data: competitions, isPending } = api.competitions.fetchAll.useQuery();
    const { items, collectionProps } = useCollection(competitions ?? [], {});

    return (
        <ContentLayout header={<Header variant="h1">Manage competitions</Header>}>
            <Table
                header={
                    <Header
                        actions={
                            <SpaceBetween size="s">
                                <CreateCompetitionModalButton />
                            </SpaceBetween>
                        }
                    >
                        Competitions
                    </Header>
                }
                loading={isPending}
                loadingText={"Loading competitions"}
                items={items}
                columnDefinitions={[
                    {
                        id: "shortName",
                        header: "Short name",
                        cell: (competition) => competition.shortName,
                        width: "20%",
                    },
                    {
                        id: "name",
                        header: "Name",
                        cell: (competition) => competition.name,
                        width: "50%",
                    },
                    {
                        id: "actions",
                        header: "Actions",
                        cell: (competition) => (
                            <SpaceBetween direction="horizontal" size="xs">
                                <DeleteCompetitionButton competition={competition} />
                            </SpaceBetween>
                        ),
                    },
                ]}
                {...collectionProps}
            />
        </ContentLayout>
    );
}

