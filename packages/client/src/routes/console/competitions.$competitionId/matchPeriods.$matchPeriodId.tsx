import { Container, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../utils/trpc";
import { DateTime } from "luxon";
import ImportScheduleModalButton from "../../../components/console/matchPeriods/ImportScheduleModalButton";
import EditMatchPeriodModalButton from "../../../components/console/matchPeriods/EditMatchPeriodModalButton";
import MatchesTable from "../../../components/console/matches/MatchesTable";

export const Route = createFileRoute("/console/competitions/$competitionId/matchPeriods/$matchPeriodId")({
    component: RouteComponent,
    beforeLoad: () => ({
        title: "Manage match period",
    }),
});

function RouteComponent() {
    const { matchPeriodId } = Route.useParams();

    const { data: matchPeriod } = api.matchPeriods.fetchById.useQuery({ id: matchPeriodId });
    const { data: matches, isPending: matchesPending } = api.matches.fetchAll.useQuery({
        filters: { matchPeriodId },
    });

    return (
        <SpaceBetween size="s">
            <Header variant="h1">{matchPeriod?.name ?? "..."}</Header>

            <Container
                header={
                    <Header
                        actions={
                            <SpaceBetween direction="horizontal" size="s">
                                {matchPeriod && <ImportScheduleModalButton matchPeriod={matchPeriod} />}
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

            {matchPeriod && (
                <MatchesTable matches={matches} matchesPending={matchesPending} matchPeriod={matchPeriod} />
            )}
        </SpaceBetween>
    );
}

