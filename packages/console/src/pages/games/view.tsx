import { Navigate, useParams } from "react-router-dom";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { Container, ContentLayout, Header } from "@cloudscape-design/components";
import { api } from "../../utils/trpc";

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
            <ContentLayout header={<Header variant="h1">{game?.name}</Header>}>
                <Container header={<Header>General</Header>}></Container>
            </ContentLayout>
        </LivecompLayout>
    );
}

