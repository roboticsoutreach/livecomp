import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import { Button, ColumnLayout, Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import MatchPeriodStatusIndicator from "../../../components/console/matchPeriods/MatchPeriodStatusIndicator";
import { showFlashbar } from "../../../state/flashbars";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import MoveCursorModalButton from "../../../components/console/competitions/control/MoveCursorModalButton";
import { DateTime } from "luxon";
import useMatchPeriodClock from "../../../hooks/useMatchPeriodClock";
import MatchesTable from "../../../components/console/matches/MatchesTable";
import { AppRouterOutput } from "@livecomp/server";

export const Route = createFileRoute("/console/competitions/$competitionId/control")({
    component: RouteComponent,
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });
    const { data: activeMatchPeriod } = api.matchPeriods.fetchActiveByCompetitionId.useQuery({
        competitionId,
        nextIfNotFound: true,
    });
    const matchPeriodClock = useMatchPeriodClock(activeMatchPeriod, competition?.game);

    const { mutate: updateMatchPeriod, isPending: updateMatchPeriodPending } = api.matchPeriods.update.useMutation();

    const setStatus = (status: MatchPeriod["status"]) => {
        if (!activeMatchPeriod) {
            showFlashbar({ type: "error", content: "Failed to update status: no active match period" });
            return;
        }

        updateMatchPeriod({
            id: activeMatchPeriod.id,
            data: {
                status,
            },
        });
    };

    return (
        <SpaceBetween size="s">
            <Container header={<Header description={competition?.name}>Match Control</Header>}>
                {activeMatchPeriod && (
                    <ColumnLayout columns={2}>
                        <div>
                            <ColumnLayout columns={4}>
                                <Button
                                    iconName="play"
                                    fullWidth
                                    onClick={() => setStatus("inProgress")}
                                    disabled={activeMatchPeriod.status !== "paused"}
                                    loading={updateMatchPeriodPending}
                                >
                                    Play
                                </Button>
                                <Button
                                    iconName="pause"
                                    fullWidth
                                    onClick={() => setStatus("paused")}
                                    disabled={activeMatchPeriod.status !== "inProgress"}
                                    loading={updateMatchPeriodPending}
                                >
                                    Pause
                                </Button>
                                {matchPeriodClock && (
                                    <MoveCursorModalButton matchPeriod={activeMatchPeriod} clock={matchPeriodClock} />
                                )}
                            </ColumnLayout>
                        </div>
                        <div>
                            <KeyValuePairs
                                columns={2}
                                items={[
                                    {
                                        label: "Match Period",
                                        value: activeMatchPeriod.name,
                                    },
                                    {
                                        label: "Starts at",
                                        value: DateTime.fromJSDate(activeMatchPeriod.startsAt).toLocaleString(
                                            DateTime.DATETIME_SHORT_WITH_SECONDS
                                        ),
                                    },
                                    {
                                        label: "Status",
                                        value: <MatchPeriodStatusIndicator matchPeriod={activeMatchPeriod} />,
                                    },
                                    {
                                        label: "Cursor",
                                        value: activeMatchPeriod.cursorPosition,
                                    },
                                    {
                                        label: "Staging matches",
                                        value:
                                            activeMatchPeriod.matches
                                                .filter(
                                                    (match) => matchPeriodClock?.getMatchStatus(match.id) === "staging"
                                                )
                                                .map((match) => match.name)
                                                .join(", ") || "None",
                                    },
                                    {
                                        label: "In progress matches",
                                        value:
                                            activeMatchPeriod.matches
                                                .filter(
                                                    (match) =>
                                                        matchPeriodClock?.getMatchStatus(match.id) === "inProgress"
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

            {activeMatchPeriod && (
                <MatchesTable
                    competitionId={competitionId}
                    matchPeriod={activeMatchPeriod}
                    matches={activeMatchPeriod.matches as AppRouterOutput["matches"]["fetchAll"]}
                    matchesPending={false}
                />
            )}
        </SpaceBetween>
    );
}

