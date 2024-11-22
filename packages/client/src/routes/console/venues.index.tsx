import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../utils/trpc";
import { ContentLayout, Header, Table, SpaceBetween, Box, Alert } from "@cloudscape-design/components";
import CreateVenueModalButton from "../../components/console/venues/CreateVenueModalButton";
import DeleteVenueButton from "../../components/console/venues/DeleteVenueButton";
import { RoutedLink } from "../../components/console/util/RoutedLink";

export const Route = createFileRoute("/console/venues/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage venues",
    }),
});

function RouteComponent() {
    const { data: venues, isPending, isError } = api.venues.fetchAll.useQuery();

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
                        cell: (venue) => (
                            <RoutedLink to="/console/venues/$venueId" params={{ venueId: venue.id }}>
                                {venue.name}
                            </RoutedLink>
                        ),
                    },
                    {
                        id: "actions",
                        header: "Actions",
                        cell: (venue) => (
                            <SpaceBetween direction="horizontal" size="xs">
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
                    isError ? (
                        <Alert type="error">Failed to load venues. Please try again later.</Alert>
                    ) : (
                        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                            <SpaceBetween size="m">
                                <b>No venues</b>
                                <CreateVenueModalButton />
                            </SpaceBetween>
                        </Box>
                    )
                }
                enableKeyboardNavigation
            />
        </ContentLayout>
    );
}

