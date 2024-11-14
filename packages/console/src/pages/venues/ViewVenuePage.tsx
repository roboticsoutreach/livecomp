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
import CreateShepherdModalButton from "../../components/venues/shepherds/CreateShepherdModalButton";
import EditShepherdModalButton from "../../components/venues/shepherds/EditShepherdModalButton";
import DeleteShepherdButton from "../../components/venues/shepherds/DeleteShepherdButton";

export default function ViewVenuePage() {
    const { id } = useParams();

    const { data: venue } = api.venues.fetchById.useQuery({ id: id ?? "" }, { enabled: !!id });
    const { data: regions, isPending: regionsPending } = api.regions.fetchAllByVenueId.useQuery(
        { venueId: id ?? "" },
        { enabled: !!id }
    );
    const { data: shepherds, isPending: shepherdsPending } = api.shepherds.fetchAllByVenueId.useQuery(
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
                                description="Regions are areas within the venue in which team pits are located."
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

                    <Table
                        header={
                            <Header
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {venue && regions && (
                                            <CreateShepherdModalButton venueId={venue.id} regions={regions} />
                                        )}
                                    </SpaceBetween>
                                }
                                description="Shepherds are responsible for managing the team pits in one or more regions."
                            >
                                Shepherds
                            </Header>
                        }
                        items={shepherds ?? []}
                        columnDefinitions={[
                            {
                                id: "name",
                                header: "Name",
                                cell: (shepherd) => shepherd.name,
                                width: "50%",
                            },
                            {
                                id: "actions",
                                header: "Actions",
                                cell: (shepherd) => (
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {regions && <EditShepherdModalButton shepherd={shepherd} regions={regions} />}
                                        {<DeleteShepherdButton shepherd={shepherd} />}
                                    </SpaceBetween>
                                ),
                            },
                        ]}
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    <b>No shepherds</b>
                                    {venue && regions && (
                                        <CreateShepherdModalButton venueId={venue.id} regions={regions} />
                                    )}
                                </SpaceBetween>
                            </Box>
                        }
                        loading={shepherdsPending}
                    />
                </SpaceBetween>
            </ContentLayout>
        </LivecompLayout>
    );
}

