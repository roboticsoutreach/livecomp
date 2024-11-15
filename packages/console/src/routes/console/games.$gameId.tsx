import { createFileRoute, Navigate } from "@tanstack/react-router";
import { api } from "../../utils/trpc";
import {
    ContentLayout,
    Header,
    SpaceBetween,
    Container,
    KeyValuePairs,
    Table,
    Box,
} from "@cloudscape-design/components";
import EditGameModalButton from "../../components/games/EditGameModalButton";
import CreateStartingZoneModalButton from "../../components/games/startingZones/CreateStartingZoneModalButton";
import DeleteStartingZoneButton from "../../components/games/startingZones/DeleteStartingZoneButton";
import EditStartingZoneModalButton from "../../components/games/startingZones/EditStartingZoneModalButton";

export const Route = createFileRoute("/console/games/$gameId")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage game",
    }),
});

function RouteComponent() {
    const { gameId: id } = Route.useParams();

    const { data: game } = api.games.fetchById.useQuery({ id: id });
    const { data: startingZones, isPending: startingZonesPending } = api.startingZones.fetchAllByGameId.useQuery({
        gameId: id,
    });

    if (!id) {
        return <Navigate to="/console/games" />;
    }

    return (
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
                            width: "30%",
                        },
                        {
                            id: "color",
                            header: "Color",
                            cell: (startingZone) => startingZone.color,
                            width: "30%",
                        },
                        {
                            id: "actions",
                            header: "Actions",
                            cell: (startingZone) => (
                                <SpaceBetween direction="horizontal" size="xs">
                                    <EditStartingZoneModalButton startingZone={startingZone} />
                                    <DeleteStartingZoneButton startingZone={startingZone} />
                                </SpaceBetween>
                            ),
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
    );
}

