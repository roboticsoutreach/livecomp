import { Navigate, useParams } from "react-router-dom";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { $api } from "../../modules/api";
import { Container, ContentLayout, Header } from "@cloudscape-design/components";

export default function ViewGamePage() {
    const { id } = useParams();

    const { data } = $api.useQuery(
        "get",
        `/games/${id}`,
        {
            params: { path: { id: id ?? "" } },
        },
        {
            enabled: !!id,
        }
    );

    if (!id) {
        return <Navigate to="/games" />;
    }

    const game = data?.game;

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

