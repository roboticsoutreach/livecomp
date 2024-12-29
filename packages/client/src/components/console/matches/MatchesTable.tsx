import { useCollection } from "@cloudscape-design/collection-hooks";
import { Table, Header, SpaceBetween, Pagination } from "@cloudscape-design/components";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import Restricted from "../util/Restricted";
import { AppRouterOutput } from "@livecomp/server";
import CreateMatchModalButton from "./CreateMatchModalButton";
import DeleteMatchButton from "./DeleteMatchButton";

export default function MatchesTable({
    matches,
    matchesPending,
    matchPeriod,
}: {
    matches: AppRouterOutput["matches"]["fetchAll"] | undefined;
    matchesPending: boolean;
    matchPeriod: MatchPeriod;
}) {
    const { items, collectionProps, paginationProps } = useCollection(matches ?? [], {
        sorting: {
            defaultState: {
                sortingColumn: {
                    sortingField: "sequenceNumber",
                },
            },
        },
        pagination: {
            pageSize: 10,
        },
    });

    return (
        <Table
            header={
                <Header
                    actions={
                        <Restricted role="admin">
                            <SpaceBetween size="s">
                                <CreateMatchModalButton matchPeriod={matchPeriod} />
                            </SpaceBetween>
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
                    cell: (match) => (
                        <Restricted role="admin">
                            <SpaceBetween direction="horizontal" size="xs">
                                <DeleteMatchButton match={match} />
                            </SpaceBetween>
                        </Restricted>
                    ),
                },
            ]}
            {...collectionProps}
            pagination={<Pagination {...paginationProps} />}
        />
    );
}

