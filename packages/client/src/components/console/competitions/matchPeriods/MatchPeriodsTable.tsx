import { useCollection } from "@cloudscape-design/collection-hooks";
import { Table, Header, SpaceBetween } from "@cloudscape-design/components";
import { Competition } from "@livecomp/server/src/db/schema/competitions";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import CreateMatchPeriodModalButton from "./CreateMatchPeriodModalButton";
import DeleteMatchPeriodButton from "./DeleteMatchPeriodButton";
import { DateTime } from "luxon";

export default function MatchPeriodsTable({
    matchPeriods,
    matchPeriodsPending,
    competition,
}: {
    matchPeriods: MatchPeriod[] | undefined;
    matchPeriodsPending: boolean;
    competition: Competition;
}) {
    const { items, collectionProps } = useCollection(matchPeriods ?? [], {
        sorting: {
            defaultState: {
                sortingColumn: {
                    sortingField: "startsAt",
                },
            },
        },
    });

    return (
        <Table
            header={
                <Header
                    actions={
                        <SpaceBetween size="s">
                            <CreateMatchPeriodModalButton competition={competition} />
                        </SpaceBetween>
                    }
                    counter={`(${matchPeriods?.length ?? "..."})`}
                >
                    Match Periods
                </Header>
            }
            loading={matchPeriodsPending}
            loadingText={"Loading match periods"}
            items={items}
            columnDefinitions={[
                {
                    id: "name",
                    header: "Name",
                    cell: (matchPeriod) => matchPeriod.name,
                    width: "30%",
                },
                {
                    id: "startsAt",
                    header: "Starts at",
                    cell: (matchPeriod) =>
                        DateTime.fromJSDate(matchPeriod.startsAt).toLocaleString(DateTime.DATETIME_SHORT),
                    width: "30%",
                },
                {
                    id: "actions",
                    header: "Actions",
                    cell: (matchPeriod) => (
                        <SpaceBetween direction="horizontal" size="xs">
                            <DeleteMatchPeriodButton matchPeriod={matchPeriod} />
                        </SpaceBetween>
                    ),
                },
            ]}
            {...collectionProps}
        />
    );
}

