import { StatusIndicator } from "@cloudscape-design/components";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";

export default function MatchPeriodStatusIndicator({ matchPeriod }: { matchPeriod: MatchPeriod }) {
    if (matchPeriod.status === "notStarted")
        return (
            <StatusIndicator type="pending" colorOverride="grey">
                Not started
            </StatusIndicator>
        );
    if (matchPeriod.status === "inProgress")
        return (
            <StatusIndicator type="in-progress" colorOverride="yellow">
                In progress
            </StatusIndicator>
        );
    if (matchPeriod.status === "paused")
        return (
            <StatusIndicator type="warning" colorOverride="blue">
                Paused
            </StatusIndicator>
        );
    if (matchPeriod.status === "finished")
        return (
            <StatusIndicator type="success" colorOverride="green">
                Finished
            </StatusIndicator>
        );
}

