import { Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import { DateTime } from "luxon";
import EditMatchPeriodModalButton from "../../../components/console/competitions/matchPeriods/EditMatchPeriodModalButton";

export const Route = createFileRoute("/console/competitions/$competitionId/matchPeriods/$matchPeriodId")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage match period",
    }),
});

function RouteComponent() {
    const { matchPeriodId } = Route.useParams();

    const { data: matchPeriod } = api.matchPeriods.fetchById.useQuery({ id: matchPeriodId });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{matchPeriod?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween direction="horizontal" size="s">
                                {matchPeriod && <EditMatchPeriodModalButton matchPeriod={matchPeriod} />}
                            </SpaceBetween>
                        }
                    >
                        General
                    </Header>
                }
            >
                <KeyValuePairs
                    columns={2}
                    items={[
                        {
                            label: "Name",
                            value: matchPeriod?.name ?? "...",
                        },
                        {
                            label: "Starts at",
                            value: matchPeriod?.startsAt
                                ? DateTime.fromJSDate(matchPeriod.startsAt).toLocaleString(
                                      DateTime.DATETIME_SHORT_WITH_SECONDS
                                  )
                                : "...",
                        },
                    ]}
                />
            </Container>
        </SpaceBetween>
    );
}

