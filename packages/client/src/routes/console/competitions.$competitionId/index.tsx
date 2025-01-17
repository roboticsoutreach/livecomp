import { SpaceBetween, Header, Container, KeyValuePairs, Grid } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import EditCompetitionModalButton from "../../../components/console/competitions/EditCompetitionModalButton";
import { RoutedLink } from "../../../components/console/util/RoutedLink";
import { api } from "../../../utils/trpc";
import { DateTime } from "luxon";
import Restricted from "../../../components/console/util/Restricted";
import TeamsTable from "../../../components/console/teams/TeamsTable";
import MatchPeriodsTable from "../../../components/console/matchPeriods/MatchPeriodsTable";

export const Route = createFileRoute("/console/competitions/$competitionId/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Overview",
    }),
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: competition } = api.competitions.fetchById.useQuery({
        id: competitionId,
    });
    const { data: teams, isPending: teamsPending } = api.teams.fetchAll.useQuery({
        filters: { competitionId: competitionId },
    });
    const { data: matchPeriods, isPending: matchPeriodsPending } = api.matchPeriods.fetchAll.useQuery({
        filters: { competitionId: competitionId },
    });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{competition?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <Restricted role="admin">
                                <SpaceBetween direction="horizontal" size="s">
                                    {competition && <EditCompetitionModalButton competition={competition} />}
                                </SpaceBetween>
                            </Restricted>
                        }
                    >
                        General
                    </Header>
                }
            >
                <KeyValuePairs
                    columns={4}
                    items={[
                        {
                            label: "Name",
                            value: competition?.name ?? "...",
                        },
                        {
                            label: "Short name",
                            value: competition?.shortName ?? "...",
                        },
                        {
                            label: "Starts at",
                            value: competition
                                ? DateTime.fromJSDate(competition.startsAt).toLocaleString(DateTime.DATETIME_SHORT)
                                : "...",
                        },
                        {
                            label: "Ends at",
                            value: competition
                                ? DateTime.fromJSDate(competition.endsAt).toLocaleString(DateTime.DATETIME_SHORT)
                                : "...",
                        },
                        {
                            label: "Game",
                            value: competition ? (
                                <RoutedLink to="/console/games/$gameId" params={{ gameId: competition.game.id }}>
                                    {competition.game.name}
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                        {
                            label: "Venue",
                            value: competition ? (
                                <RoutedLink to="/console/venues/$venueId" params={{ venueId: competition.venue.id }}>
                                    {competition.venue.name}
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                        {
                            label: "Teams",
                            value: teams ? teams.length : "...",
                        },
                        {
                            label: "Displays",
                            value: competition ? (
                                <RoutedLink
                                    to="/console/competitions/$competitionId/displays"
                                    params={{ competitionId: competition.id }}
                                >
                                    Manage displays
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                    ]}
                />
            </Container>

            <Grid gridDefinition={[{ colspan: 7 }, { colspan: 5 }]}>
                <div>
                    {competition && <TeamsTable teams={teams} teamsPending={teamsPending} competition={competition} />}
                </div>
                <div>
                    {competition && (
                        <MatchPeriodsTable
                            matchPeriods={matchPeriods}
                            matchPeriodsPending={matchPeriodsPending}
                            competition={competition}
                        />
                    )}
                </div>
            </Grid>
        </SpaceBetween>
    );
}

