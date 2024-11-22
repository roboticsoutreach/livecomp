import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../utils/trpc";
import { ContentLayout, Header, Table, SpaceBetween, Box } from "@cloudscape-design/components";
import CreateGameModalButton from "../../components/console/games/CreateGameModalButton";
import DeleteGameButton from "../../components/console/games/DeleteGameButton";
import { RoutedLink } from "../../components/console/util/RoutedLink";

export const Route = createFileRoute("/console/games/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage games",
    }),
});

function RouteComponent() {
    const { data: games, isPending } = api.games.fetchAll.useQuery();

    return (
        <ContentLayout
            header={
                <Header
                    variant="h1"
                    description={
                        <>
                            Games are played between robots in matches. They contain starting zones as well as scoring
                            configurations.
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
                        cell: (game) => (
                            <RoutedLink to="/console/games/$gameId" params={{ gameId: game.id }}>
                                {game.name}
                            </RoutedLink>
                        ),
                    },
                    {
                        id: "actions",
                        header: "Actions",
                        cell: (game) => (
                            <SpaceBetween direction="horizontal" size="xs">
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
    );
}

