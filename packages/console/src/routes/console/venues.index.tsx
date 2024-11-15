import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "../../utils/trpc";
import { ContentLayout, Header, Table, SpaceBetween, Button, Box } from "@cloudscape-design/components";
import CreateVenueModalButton from "../../components/console/venues/CreateVenueModalButton";
import DeleteVenueButton from "../../components/console/venues/DeleteVenueButton";

export const Route = createFileRoute("/console/venues/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage venues",
    }),
});

function RouteComponent() {
    const navigate = useNavigate();

    const { data: venues, isPending } = api.venues.fetchAll.useQuery();

    return (
        <ContentLayout
            header={
                <Header
                    variant="h1"
                    description={
                        <>
                            Venues refer to the spaces in which competitions are held. They contain regions, and
                            shepherds who are assignerd to regions.
                        </>
                    }
                >
                    Manage venues
                </Header>
            }
        >
            <Table
                columnDefinitions={[
                    {
                        id: "name",
                        header: "Name",
                        width: "50%",
                        isRowHeader: true,
                        cell: (venue) => venue.name,
                    },
                    {
                        id: "actions",
                        header: "Actions",
                        cell: (venue) => (
                            <SpaceBetween direction="horizontal" size="xs">
                                <Button
                                    onClick={() =>
                                        navigate({ to: "/console/venues/$venueId", params: { venueId: venue.id } })
                                    }
                                >
                                    View
                                </Button>
                                <DeleteVenueButton venue={venue} />
                            </SpaceBetween>
                        ),
                    },
                ]}
                loading={isPending}
                loadingText="Loading venues"
                items={venues ?? []}
                header={
                    <Header
                        actions={
                            <SpaceBetween size="xs">
                                <CreateVenueModalButton />
                            </SpaceBetween>
                        }
                    >
                        Venues
                    </Header>
                }
                empty={
                    <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                        <SpaceBetween size="m">
                            <b>No venues</b>
                            <CreateVenueModalButton />
                        </SpaceBetween>
                    </Box>
                }
                enableKeyboardNavigation
            />
        </ContentLayout>
    );
}

