import { Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../../utils/trpc";
import { RoutedLink } from "../../../../components/console/util/RoutedLink";
import EditMatchModalButton from "../../../../components/console/matches/EditMatchModalButton";
import EditMatchAssignmentsModalButton from "../../../../components/console/matches/EditMatchAssignmentsModalButton";

export const Route = createFileRoute(
    "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId"
)({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage match",
    }),
});

function RouteComponent() {
    const { matchId, matchPeriodId, competitionId } = Route.useParams();

    const { data: match } = api.matches.fetchById.useQuery({ id: matchId });
    const { data: matchPeriod } = api.matchPeriods.fetchById.useQuery({ id: matchPeriodId });
    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{match?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween size="s" direction="horizontal">
                                {match && <EditMatchModalButton match={match} />}
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
                            value: match?.name ?? "...",
                        },
                        {
                            label: "Sequence number",
                            value: match?.sequenceNumber ?? "...",
                        },
                        {
                            label: "Match period",
                            value: matchPeriod ? (
                                <RoutedLink
                                    to={"/console/competitions/$competitionId/matchPeriods/$matchPeriodId"}
                                    params={{ competitionId, matchPeriodId }}
                                >
                                    {matchPeriod.name}
                                </RoutedLink>
                            ) : (
                                "..."
                            ),
                        },
                    ]}
                />
            </Container>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween direction="horizontal" size="xs">
                                {match && competition && (
                                    <EditMatchAssignmentsModalButton match={match} competition={competition} />
                                )}
                            </SpaceBetween>
                        }
                    >
                        Assignments
                    </Header>
                }
            >
                {competition && (
                    <KeyValuePairs
                        columns={competition.game.startingZones.length}
                        items={competition.game.startingZones.map((zone) => {
                            const team = match?.assignments.find(
                                (assignment) => assignment.startingZoneId === zone.id
                            )?.team;

                            return {
                                label: `Zone ${zone.name}`,
                                value: team ? (
                                    <RoutedLink
                                        to="/console/competitions/$competitionId/teams/$teamId"
                                        params={{ competitionId, teamId: team.id }}
                                    >
                                        {team.shortName}
                                    </RoutedLink>
                                ) : (
                                    "..."
                                ),
                            };
                        })}
                    />
                )}
            </Container>
        </SpaceBetween>
    );
}

