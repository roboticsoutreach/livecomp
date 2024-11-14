import { Box, Button, ContentLayout, Header, SpaceBetween, Table } from "@cloudscape-design/components";
import LivecompLayout from "../../components/layout/LivecompLayout";
import CreateGameModalButton from "../../components/games/CreateGameModalButton";
import DeleteGameButton from "../../components/games/DeleteGameButton";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/trpc";

export default function GamesPage() {
    const navigate = useNavigate();

    const { data: games, isPending } = api.games.fetchAll.useQuery();

    return (
        <LivecompLayout breadcrumbItems={[{ text: "Games", href: "/games" }]}>
            <ContentLayout
                header={
                    <Header
                        variant="h1"
                        description={
                            <>
                                Games are played between robots in matches. They contain starting zones as well as
                                scoring configurations.
                            </>
                        }
                    >
                        Manage games
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
                            cell: (game) => game.name,
                        },
                        {
                            id: "actions",
                            header: "Actions",
                            cell: (game) => (
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button onClick={() => navigate(`/games/${game.id}`)}>View</Button>
                                    <DeleteGameButton game={game} />
                                </SpaceBetween>
                            ),
                        },
                    ]}
                    loading={isPending}
                    loadingText="Loading games"
                    items={games ?? []}
                    header={
                        <Header
                            actions={
                                <SpaceBetween size="xs">
                                    <CreateGameModalButton />
                                </SpaceBetween>
                            }
                        >
                            Games
                        </Header>
                    }
                    empty={
                        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
                            <SpaceBetween size="m">
                                <b>No games</b>
                                <CreateGameModalButton />
                            </SpaceBetween>
                        </Box>
                    }
                    enableKeyboardNavigation
                />
            </ContentLayout>
        </LivecompLayout>
    );
}

