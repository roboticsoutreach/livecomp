import type { DisplayMessage } from "@livecomp/server/src/modules/displays/messages";
import { api } from "../../utils/trpc";
import { useEffect, useState } from "react";
import DisplayOverlay from "./DisplayOverlay";
import { useNavigate } from "@tanstack/react-router";

export default function DisplayController({
    identifier,
    competitionId,
}: {
    identifier: string;
    competitionId: string;
}) {
    const navigate = useNavigate();
    const [text, setText] = useState<string | null>(null);

    const { data: display } = api.displays.fetchByIdentifier.useQuery({ identifier, competitionId });

    useEffect(() => {
        if (!display) return;

        if (display.configuration.mode === "arena") {
            navigate({
                to: "/display/$competitionId/arena",
                params: { competitionId: display.competitionId },
                search: { startingZoneId: display.configuration.startingZoneId, identifier },
            });
        } else if (display.configuration.mode === "outside") {
            navigate({
                to: "/display/$competitionId/leaderboard",
                params: { competitionId: display.competitionId },
                search: { identifier },
            });
        }
    }, [display, identifier, navigate]);

    api.displays.onStreamMessage.useSubscription(
        { identifier },
        {
            onData: (message: DisplayMessage) => {
                if (message.type === "showText") {
                    setText(message.text);
                    setTimeout(() => setText(null), message.durationMs);
                }
            },
        }
    );

    return (
        <>
            {text && (
                <DisplayOverlay>
                    <h1 className="text-6xl text-white font-bold text-center whitespace-pre-line">{text}</h1>
                </DisplayOverlay>
            )}
        </>
    );
}

