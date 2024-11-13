import { Navigate, useParams } from "react-router-dom";
import LivecompLayout from "../../components/layout/LivecompLayout";
import {
    Box,
    Container,
    ContentLayout,
    Header,
    KeyValuePairs,
    SpaceBetween,
    Table,
} from "@cloudscape-design/components";
import { api } from "../../utils/trpc";
import EditVenueModalButton from "../../components/venues/EditVenueModalButton";
import CreateRegionModalButton from "../../components/venues/regions/CreateRegionModalButton";
import DeleteRegionButton from "../../components/venues/regions/DeleteRegionButton";
import EditRegionModalButton from "../../components/venues/regions/EditRegionModalButton";

export default function ViewVenuePage() {
    const { id } = useParams();

    const { data: venue } = api.venues.fetchById.useQuery({ id: id ?? "" }, { enabled: !!id });
    const { data: regions, isPending: regionsPending } = api.regions.fetchAllByVenueId.useQuery(
        { venueId: id ?? "" },
        { enabled: !!id }
    );

    if (!id) {
        return <Navigate to="/venues" />;
    }

    return (
        <LivecompLayout
            breadcrumbItems={[
                { text: "Venues", href: "/venues" },
                { text: venue?.name ?? "...", href: `/venues/${id}` },
            ]}
        >
            <ContentLayout header={<Header variant="h1">{venue?.name ?? "..."}</Header>}>
                <SpaceBetween size="s">
                    <Container
                        header={
                            <Header
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {venue && <EditVenueModalButton venue={venue} />}
                                    </SpaceBetween>
                                }
                            >
                                General
                            </Header>
                        }
                    >
                        <KeyValuePairs
                            columns={3}
                            items={[
                                {
                                    label: "Name",
                                    value: venue?.name ?? "...",
                                },
                            ]}
                        />
                    </Container>

                    <Table
                        header={
                            <Header
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {venue && <CreateRegionModalButton venueId={venue.id} />}
                                    </SpaceBetween>
                                }
                            >
                                Regions
                            </Header>
                        }
                        items={regions ?? []}
                        columnDefinitions={[
                            {
                                id: "name",
                                header: "Name",
                                cell: (region) => region.name,
                                width: "50%",
                            },
                            {
                                id: "actions",
                                header: "Actions",
                                cell: (region) => (
                                    <SpaceBetween direction="horizontal" size="xs">
                                        <EditRegionModalButton region={region} />
                                        <DeleteRegionButton region={region} />
                                    </SpaceBetween>
                                ),
                            },
                        ]}
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    <b>No regions</b>
                                    {venue && <CreateRegionModalButton venueId={venue.id} />}
                                </SpaceBetween>
                            </Box>
                        }
                        loading={regionsPending}
                    />
                </SpaceBetween>
            </ContentLayout>
        </LivecompLayout>
    );
}

