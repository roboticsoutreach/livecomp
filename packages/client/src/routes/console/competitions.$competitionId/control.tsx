import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import { Button, ColumnLayout, Container, Header, KeyValuePairs } from "@cloudscape-design/components";
import MatchPeriodStatusIndicator from "../../../components/console/matchPeriods/MatchPeriodStatusIndicator";
import { showFlashbar } from "../../../state/flashbars";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";

export const Route = createFileRoute("/console/competitions/$competitionId/control")({
    component: RouteComponent,
});

function RouteComponent() {
    const { competitionId } = Route.useParams();

    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });
    const { data: activeMatchPeriod } = api.matchPeriods.fetchActiveByCompetitionId.useQuery({ competitionId });

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
                                    label: "Status",
                                    value: <MatchPeriodStatusIndicator matchPeriod={activeMatchPeriod} />,
                                },
                                {
                                    label: "Cursor",
                                    value: activeMatchPeriod.cursorPosition,
                                },
                            ]}
                        />
                    </div>
                </ColumnLayout>
            )}
        </Container>
    );
}

