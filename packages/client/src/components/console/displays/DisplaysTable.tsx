import { useCollection } from "@cloudscape-design/collection-hooks";
import { Table, Header, SpaceBetween, Pagination, StatusIndicator } from "@cloudscape-design/components";
import Restricted from "../util/Restricted";
import { AppRouterOutput } from "@livecomp/server";
import CreateDisplayModalButton from "./CreateDisplayModalButton";

export default function DisplaysTable({
    displays,
    displaysPending,
    competitionId,
}: {
    displays: AppRouterOutput["displays"]["fetchAll"] | undefined;
    displaysPending: boolean;
    competitionId: string;
}) {
    const { items, collectionProps, paginationProps } = useCollection(displays ?? [], {
        sorting: {
            defaultState: {
                sortingColumn: {
                    sortingField: "identifier",
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
                                <CreateDisplayModalButton competitionId={competitionId} />
                            </SpaceBetween>
                        </Restricted>
                    }
                    counter={`(${displays?.length ?? "..."})`}
                >
                    Displays
                </Header>
            }
            loading={displaysPending}
            loadingText={"Loading displays"}
            items={items}
            columnDefinitions={[
                {
                    id: "identifier",
                    header: "Identifier",
                    cell: (display) => display.identifier,
                    width: "20%",
                },
                {
                    id: "name",
                    header: "Name",
                    cell: (display) => display.name,
                    width: "20%",
                },
                {
                    id: "status",
                    header: "Status",
                    cell: (display) => (
                        <StatusIndicator type={display.online ? "success" : "stopped"}>
                            {display.online ? "Online" : "Offline"}
                        </StatusIndicator>
                    ),
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
            pagination={<Pagination {...paginationProps} />}
        />
    );
}

