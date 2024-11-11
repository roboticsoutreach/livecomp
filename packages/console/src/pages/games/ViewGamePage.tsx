import { Navigate, useParams } from "react-router-dom";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { Container, ContentLayout, Header, KeyValuePairs, SpaceBetween } from "@cloudscape-design/components";
import { api } from "../../utils/trpc";
import EditGameModalButton from "../../components/games/EditGameModalButton";

export default function ViewGamePage() {
    const { id } = useParams();

    const { data: game } = api.games.fetchById.useQuery({ id: id ?? "" });

    if (!id) {
        return <Navigate to="/games" />;
    }

    return (
        <LivecompLayout
            breadcrumbItems={[
                { text: "Games", href: "/games" },
                { text: game?.name ?? "...", href: `/games/${id}` },
            ]}
        >
            <ContentLayout header={<Header variant="h1">{game?.name ?? "..."}</Header>}>
                <Container
                    header={
                        <Header
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    {game && <EditGameModalButton game={game} />}
                                </SpaceBetween>
                            }
                        >
                            General
                        </Header>
                    }
                >
                    <KeyValuePairs
                        columns={3}
                        items={[
                            {
                                label: "Name",
                                value: game?.name ?? "...",
                            },
                        ]}
                    />
                </Container>
            </ContentLayout>
        </LivecompLayout>
    );
}

