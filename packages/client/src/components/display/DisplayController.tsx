import type { DisplayMessage } from "@livecomp/server/src/modules/displays/messages";
import { api } from "../../utils/trpc";
import { useState } from "react";
import DisplayOverlay from "./DisplayOverlay";

export default function DisplayController({ identifier }: { identifier: string }) {
    const [text, setText] = useState<string | null>(null);

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

