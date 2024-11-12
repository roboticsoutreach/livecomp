import { Box, Button, ContentLayout, Header, SpaceBetween, Table } from "@cloudscape-design/components";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/trpc";
import CreateVenueModalButton from "../../components/venues/CreateVenueModalButton";
import DeleteVenueButton from "../../components/venues/DeleteVenueButton";

export default function VenuesPage() {
    const navigate = useNavigate();

    const { data: venues, isPending } = api.venues.fetchAll.useQuery();

    return (
        <LivecompLayout breadcrumbItems={[{ text: "Venues", href: "/venues" }]}>
            <ContentLayout header={<Header variant="h1">Manage venues</Header>}>
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
                                    <Button onClick={() => navigate(`/venues/${venue.id}`)}>View</Button>
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
        </LivecompLayout>
    );
}

