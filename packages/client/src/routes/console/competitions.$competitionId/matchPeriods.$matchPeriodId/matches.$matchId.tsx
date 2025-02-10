import { Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../../utils/trpc";
import { RoutedLink } from "../../../../components/console/util/RoutedLink";
import EditMatchModalButton from "../../../../components/console/matches/EditMatchModalButton";
import EditMatchAssignmentsModalButton from "../../../../components/console/matches/EditMatchAssignmentsModalButton";
import useMatchPeriodClock from "../../../../hooks/useMatchPeriodClock";
import { useMemo } from "react";
import { DateTime } from "luxon";
import MatchStatusIndicator from "../../../../components/console/matches/MatchStatusIndicator";

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
    const { data: matches } = api.matches.fetchAll.useQuery({ filters: { matchPeriodId } });
    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });

    const matchPeriodClock = useMatchPeriodClock(
        matchPeriod && matches ? { ...matchPeriod, matches } : undefined,
        competition?.game
    );
    const timings = useMemo(() => matchPeriodClock?.getMatchTimings(matchId), [matchPeriodClock, matchId]);

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
                    columns={4}
                    items={[
                        {
                            label: "Name",
                            value: match?.name ?? "...",
                        },
                        {
                            label: "Type",
                            value: match ? (match.type === "league" ? "League" : "Knockout") : "...",
                        },
                        {
                            label: "Sequence number",
                            value: match?.sequenceNumber ?? "...",
                        },
                        {
                            label: "Status",
                            value: matchPeriodClock ? (
                                <MatchStatusIndicator status={matchPeriodClock?.getMatchStatus(matchId)} />
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

            <Container header={<Header>Timings</Header>}>
                <KeyValuePairs
                    columns={4}
                    items={[
                        {
                            label: "Staging open",
                            value: timings
                                ? timings.absoluteTimes.stagingOpen.toLocaleString(
                                      DateTime.DATETIME_FULL_WITH_SECONDS
                                  ) + ` (${timings.cusorPositions.stagingOpen})`
                                : "...",
                        },
                        {
                            label: "Staging close",
                            value: timings
                                ? timings.absoluteTimes.stagingClose.toLocaleString(
                                      DateTime.DATETIME_FULL_WITH_SECONDS
                                  ) + ` (${timings.cusorPositions.stagingClose})`
                                : "...",
                        },
                        {
                            label: "Start",
                            value: timings
                                ? timings.absoluteTimes.start.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) +
                                  ` (${timings.cusorPositions.start})`
                                : "...",
                        },
                        {
                            label: "End",
                            value: timings
                                ? timings.absoluteTimes.end.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) +
                                  ` (${timings.cusorPositions.end})`
                                : "...",
                        },
                    ]}
                />
            </Container>
        </SpaceBetween>
    );
}

