import { Navigate, useParams } from "react-router-dom";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { Container, ContentLayout, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { api } from "../../utils/trpc";
import EditVenueModalButton from "../../components/venues/EditVenueModalButton";

export default function ViewVenuePage() {
    const { id } = useParams();

    const { data: venue } = api.venues.fetchById.useQuery({ id: id ?? "" }, { enabled: !!id });
    /* const { data: startingZones, isPending: startingZonesPending } = api.startingZones.fetchAllByGameId.useQuery(
        { gameId: id ?? "" },
        { enabled: !!id }
    ); */

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
                </SpaceBetween>
            </ContentLayout>
        </LivecompLayout>
    );
}

