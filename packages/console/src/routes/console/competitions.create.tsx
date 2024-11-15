import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ContentLayout,
  Header,
  Wizard,
  Container,
} from "@cloudscape-design/components";

export const Route = createFileRoute("/console/competitions/create")({
  component: RouteComponent,
  beforeLoad: () => ({
    title: "Create competition",
  }),
});

function RouteComponent() {
  const navigate = useNavigate();

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <ContentLayout header={<Header variant="h1">Create competition</Header>}>
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
        onCancel={() => navigate({ to: "/console/competitions" })}
        submitButtonText="Create competition"
        activeStepIndex={activeStepIndex}
        onNavigate={({ detail }) =>
          setActiveStepIndex(detail.requestedStepIndex)
        }
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
  );
}
