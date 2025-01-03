import { useCollection } from "@cloudscape-design/collection-hooks";
import { Table, Header, SpaceBetween, Pagination } from "@cloudscape-design/components";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import Restricted from "../util/Restricted";
import { AppRouterOutput } from "@livecomp/server";
import CreateMatchModalButton from "./CreateMatchModalButton";
import DeleteMatchButton from "./DeleteMatchButton";
import { RoutedLink } from "../util/RoutedLink";
import { api } from "../../../utils/trpc";
import useMatchPeriodClock from "../../../hooks/useMatchPeriodClock";
import { useMemo } from "react";
import MatchStatusIndicator from "./MatchStatusIndicator";

export default function MatchesTable({
    matches,
    matchesPending,
    matchPeriod,
    competitionId,
}: {
    matches: AppRouterOutput["matches"]["fetchAll"] | undefined;
    matchesPending: boolean;
    matchPeriod?: MatchPeriod;
    competitionId: string;
}) {
    const { data: competition } = api.competitions.fetchById.useQuery({ id: competitionId });

    const matchPeriodWithMatches = useMemo(
        () => (matches && matchPeriod ? { ...matchPeriod, matches } : undefined),
        [matchPeriod, matches]
    );
    const matchPeriodClock = useMatchPeriodClock(matchPeriodWithMatches, competition?.game);

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
                                {matchPeriod && <CreateMatchModalButton matchPeriod={matchPeriod} />}
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
                    cell: (match) => (
                        <RoutedLink
                            to="/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId"
                            params={{
                                competitionId: competitionId,
                                matchPeriodId: match.matchPeriodId,
                                matchId: match.id,
                            }}
                        >
                            {match.name}
                        </RoutedLink>
                    ),
                    width: "20%",
                },
                {
                    id: "status",
                    header: "Status",
                    cell: (match) =>
                        matchPeriodClock ? (
                            <MatchStatusIndicator status={matchPeriodClock.getMatchStatus(match.id)} />
                        ) : (
                            "Unknown"
                        ),
                    width: "20%",
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
                    width: "20%",
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
            columnDisplay={[
                { id: "name", visible: true },
                {
                    id: "status",
                    visible: !!matchPeriodClock,
                },
                ...["sequenceNumber", "teams", "actions"].map((id) => ({ id, visible: true })),
            ]}
            {...collectionProps}
            pagination={<Pagination {...paginationProps} />}
        />
    );
}

