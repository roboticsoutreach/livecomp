import { Button, ContentLayout, Header, SpaceBetween } from "@cloudscape-design/components";
import LivecompLayout from "../../components/layout/LivecompLayout";
import { useNavigate } from "react-router-dom";

export default function CompetitionsPage() {
    const navigate = useNavigate();

    return (
        <LivecompLayout breadcrumbItems={[{ text: "Competitions", href: "/competitions" }]}>
            <ContentLayout
                header={
                    <Header
                        variant="h1"
                        actions={
                            <SpaceBetween size="xs">
                                <Button variant="primary" onClick={() => navigate("/competitions/create")}>
                                    Create
                                </Button>
                            </SpaceBetween>
                        }
                    >
                        Manage competitions
                    </Header>
                }
            ></ContentLayout>
        </LivecompLayout>
    );
}

