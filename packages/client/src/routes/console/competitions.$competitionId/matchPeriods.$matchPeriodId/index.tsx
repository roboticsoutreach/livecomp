import { Button, Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../../utils/trpc";
import { DateTime } from "luxon";
import EditMatchPeriodModalButton from "../../../../components/console/matchPeriods/EditMatchPeriodModalButton";
import DevToolsOnly from "../../../../components/console/util/DevToolsOnly";
import Restricted from "../../../../components/console/util/Restricted";

export const Route = createFileRoute("/console/competitions/$competitionId/matchPeriods/$matchPeriodId/")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage match period",
    }),
});

function RouteComponent() {
    const { matchPeriodId } = Route.useParams();

    const { data: matchPeriod } = api.matchPeriods.fetchById.useQuery({
        id: matchPeriodId,
    });

    const { mutate: resetMatchPeriod, isPending: resetPending } = api.devTools.resetMatchPeriod.useMutation();

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{matchPeriod?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween direction="horizontal" size="s">
                                <DevToolsOnly>
                                    <Restricted role="admin">
                                        <Button
                                            onClick={() => resetMatchPeriod({ id: matchPeriodId })}
                                            loading={resetPending}
                                        >
                                            Reset
                                        </Button>
                                    </Restricted>
                                </DevToolsOnly>
                                {matchPeriod && <EditMatchPeriodModalButton matchPeriod={matchPeriod} />}
                            </SpaceBetween>
                        }
                    >
                        General
                    </Header>
                }
            >
                <KeyValuePairs
                    columns={5}
                    items={[
                        {
                            label: "Name",
                            value: matchPeriod?.name ?? "...",
                        },
                        {
                            label: "Type",
                            value: matchPeriod?.type ?? "...",
                        },
                        {
                            label: "Starts at",
                            value: matchPeriod?.startsAt
                                ? DateTime.fromJSDate(matchPeriod.startsAt).toLocaleString(
                                      DateTime.DATETIME_SHORT_WITH_SECONDS
                                  )
                                : "...",
                        },
                        {
                            label: "Ends at",
                            value: matchPeriod?.endsAt
                                ? DateTime.fromJSDate(matchPeriod.endsAt).toLocaleString(
                                      DateTime.DATETIME_SHORT_WITH_SECONDS
                                  )
                                : "...",
                        },
                        {
                            label: "Ends at (latest)",
                            value: matchPeriod?.endsAtLatest
                                ? DateTime.fromJSDate(matchPeriod.endsAtLatest).toLocaleString(
                                      DateTime.DATETIME_SHORT_WITH_SECONDS
                                  )
                                : "...",
                        },
                    ]}
                />
            </Container>

            {
                // TODO add matches table back here, with filter on match periods
            }
        </SpaceBetween>
    );
}

