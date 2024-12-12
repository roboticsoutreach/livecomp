import { useCollection } from "@cloudscape-design/collection-hooks";
import { Table, Header, SpaceBetween } from "@cloudscape-design/components";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import Restricted from "../util/Restricted";
import { AppRouterOutput } from "@livecomp/server";

export default function MatchesTable({
    matches,
    matchesPending,
}: {
    matches: AppRouterOutput["matches"]["fetchAll"] | undefined;
    matchesPending: boolean;
    matchPeriod: MatchPeriod;
}) {
    const { items, collectionProps } = useCollection(matches ?? [], {
        sorting: {
            defaultState: {
                sortingColumn: {
                    sortingField: "sequenceNumber",
                },
            },
        },
    });

    return (
        <Table
            header={
                <Header
                    actions={
                        <Restricted role="admin">
                            <SpaceBetween size="s"></SpaceBetween>
                        </Restricted>
                    }
                    counter={`(${matches?.length ?? "..."})`}
                >
                    Matches
                </Header>
            }
            loading={matchesPending}
            loadingText={"Loading matches"}
            items={items}
            columnDefinitions={[
                {
                    id: "name",
                    header: "Name",
                    cell: (match) => match.name,
                    width: "25%",
                },
                {
                    id: "sequenceNumber",
                    header: "Sequence number",
                    cell: (match) => match.sequenceNumber,
                    width: "20%",
                },
                {
                    id: "teams",
                    header: "Teams",
                    cell: (match) =>
                        match.assignments.map((assignment) => assignment.team?.shortName ?? "Unknown").join(", "),
                },
                {
                    id: "actions",
                    header: "Actions",
                    cell: () => (
                        <Restricted role="admin">
                            <SpaceBetween direction="horizontal" size="xs"></SpaceBetween>
                        </Restricted>
                    ),
                },
            ]}
            {...collectionProps}
        />
    );
}

