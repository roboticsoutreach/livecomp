import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import { Button, ColumnLayout, Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import OffsetCursorModalButton from "../../../components/console/competitions/control/MoveCursorModalButton";
import MatchesTable from "../../../components/console/matches/MatchesTable";
import useCompetitionClock from "../../../hooks/useCompetitionClock";

export const Route = createFileRoute("/console/competitions/$competitionId/control")({
    component: RouteComponent,
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: competition, isPending: competitionPending } = api.competitions.fetchById.useQuery({
        id: competitionId,
    });
    const competitionClock = useCompetitionClock(competition);

    return (
        <SpaceBetween size="s">
            <Container header={<Header description={competition?.name}>Match Control</Header>}>
                {competition && (
                    <ColumnLayout columns={2}>
                        <div>
                            <ColumnLayout columns={4}>
                                <Button iconName="play" fullWidth disabled={true} loading={false}>
                                    Play
                                </Button>
                                <Button iconName="pause" fullWidth disabled={true} loading={false}>
                                    Pause
                                </Button>
                                {competitionClock && <OffsetCursorModalButton competition={competition} />}
                            </ColumnLayout>
                        </div>
                        <div>
                            <KeyValuePairs
                                columns={2}
                                items={[
                                    {
                                        label: "Match Period",
                                        value: "Unknown", // TODO add current match period
                                    },
                                    {
                                        label: "Status",
                                        value: "Unknown", // TODO add competition status
                                    },
                                    {
                                        label: "Staging matches",
                                        value:
                                            competition?.matches
                                                .filter(
                                                    (match) => competitionClock?.getMatchStatus(match.id) === "staging"
                                                )
                                                .map((match) => match.name)
                                                .join(", ") || "None",
                                    },
                                    {
                                        label: "In progress matches",
                                        value:
                                            competition?.matches
                                                .filter(
                                                    (match) =>
                                                        competitionClock?.getMatchStatus(match.id) === "inProgress"
                                                )
                                                .map((match) => match.name)
                                                .join(", ") || "None",
                                    },
                                ]}
                            />
                        </div>
                    </ColumnLayout>
                )}
            </Container>

            {competition && (
                <MatchesTable
                    competitionId={competitionId}
                    matches={competition.matches}
                    matchesPending={competitionPending}
                />
            )}
        </SpaceBetween>
    );
}

