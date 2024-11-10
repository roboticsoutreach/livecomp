import { Button, Container, ContentLayout, Header, SpaceBetween, Wizard } from "@cloudscape-design/components";
import LivecompLayout from "../../components/layout/livecompLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCompetitionPage() {
    const navigate = useNavigate();

    const [activeStepIndex, setActiveStepIndex] = useState(0);

    return (
        <LivecompLayout
            breadcrumbItems={[
                { text: "Competitions", href: "/competitions" },
                { text: "Create competition", href: "/competitions/create" },
            ]}
        >
            <ContentLayout
                header={
                    <Header
                        variant="h1"
                        actions={
                            <SpaceBetween size="xs">
                                <Button variant="primary">Create</Button>
                            </SpaceBetween>
                        }
                    >
                        Create competition
                    </Header>
                }
            >
                <Wizard
                    i18nStrings={{
                        stepNumberLabel: (num) => `Step ${num}`,
                        collapsedStepsLabel: (num, count) => `Step ${num} of ${count}`,
                        skipToButtonLabel: (step) => `Skip to ${step.title}`,
                        navigationAriaLabel: "Steps",
                        cancelButton: "Cancel",
                        previousButton: "Previous",
                        nextButton: "Next",
                        optional: "optional",
                    }}
                    onCancel={() => navigate("/competitions")}
                    submitButtonText="Create competition"
                    activeStepIndex={activeStepIndex}
                    onNavigate={({ detail }) => setActiveStepIndex(detail.requestedStepIndex)}
                    steps={[
                        {
                            title: "General",
                            description: "Specify general information about the competition.",
                            content: <Container></Container>,
                        },
                        {
                            title: "Teams",
                            description:
                                "Add any starting teams for the competition. An initial number of teams can be generated, or you can choose to add them later manually.",
                            content: <Container></Container>,
                        },
                    ]}
                />
            </ContentLayout>
        </LivecompLayout>
    );
}

