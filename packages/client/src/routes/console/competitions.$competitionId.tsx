import { Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../utils/trpc";
import { RoutedLink } from "../../components/console/util/RoutedLink";
import TeamsTable from "../../components/console/competitions/teams/TeamsTable";
import EditCompetitionModalButton from "../../components/console/competitions/EditCompetitionModalButton";

export const Route = createFileRoute("/console/competitions/$competitionId")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage competition",
    }),
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });
    const { data: game } = api.games.fetchById.useQuery({ id: competition?.gameId ?? "" }, { enabled: !!competition });
    const { data: venue } = api.venues.fetchById.useQuery(
        { id: competition?.venueId ?? "" },
        { enabled: !!competition }
    );
    const { data: teams, isPending: teamsPending } = api.teams.fetchAll.useQuery({
        filters: { competitionId: competitionId },
    });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{competition?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween direction="horizontal" size="s">
                                {competition && <EditCompetitionModalButton competition={competition} />}
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
                            label: "Short name",
                            value: competition?.shortName ?? "...",
                        },
                        {
                            label: "Name",
                            value: competition?.name ?? "...",
                        },
                        {
                            label: "Teams",
                            value: teams ? teams.length : "...",
                        },
                        {
                            label: "Game",
                            value: game ? (
                                <RoutedLink to="/console/games/$gameId" params={{ gameId: game.id }}>
                                    {game.name}
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                        {
                            label: "Venue",
                            value: venue ? (
                                <RoutedLink to="/console/venues/$venueId" params={{ venueId: venue.id }}>
                                    {venue.name}
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                    ]}
                />
            </Container>

            {competition && <TeamsTable teams={teams} teamsPending={teamsPending} competition={competition} />}
        </SpaceBetween>
    );
}

