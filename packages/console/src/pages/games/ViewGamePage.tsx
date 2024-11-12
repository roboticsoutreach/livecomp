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
import EditGameModalButton from "../../components/games/EditGameModalButton";
import CreateStartingZoneModalButton from "../../components/games/startingZones/CreateStartingZoneModalButton";

export default function ViewGamePage() {
    const { id } = useParams();

    const { data: game } = api.games.fetchById.useQuery({ id: id ?? "" }, { enabled: !!id });
    const { data: startingZones, isPending: startingZonesPending } = api.startingZones.fetchAllByGameId.useQuery(
        { gameId: id ?? "" },
        { enabled: !!id }
    );

    if (!id) {
        return <Navigate to="/games" />;
    }

    return (
        <LivecompLayout
            breadcrumbItems={[
                { text: "Games", href: "/games" },
                { text: game?.name ?? "...", href: `/games/${id}` },
            ]}
        >
            <ContentLayout header={<Header variant="h1">{game?.name ?? "..."}</Header>}>
                <SpaceBetween size="s">
                    <Container
                        header={
                            <Header
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {game && <EditGameModalButton game={game} />}
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
                                    value: game?.name ?? "...",
                                },
                            ]}
                        />
                    </Container>

                    <Table
                        header={
                            <Header
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        {game && <CreateStartingZoneModalButton gameId={game.id} />}
                                    </SpaceBetween>
                                }
                            >
                                Starting zones
                            </Header>
                        }
                        items={startingZones ?? []}
                        columnDefinitions={[
                            {
                                id: "name",
                                header: "Name",
                                cell: (startingZone) => startingZone.name,
                                width: "25%",
                            },
                            {
                                id: "color",
                                header: "Color",
                                cell: (startingZone) => startingZone.color,
                                width: "25%",
                            },
                        ]}
                        empty={
                            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                                <SpaceBetween size="m">
                                    <b>No starting zones</b>
                                    {game && <CreateStartingZoneModalButton gameId={game.id} />}
                                </SpaceBetween>
                            </Box>
                        }
                        loading={startingZonesPending}
                    />
                </SpaceBetween>
            </ContentLayout>
        </LivecompLayout>
    );
}

