import { useEffect } from "react";
import { api } from "../../utils/trpc";

export default function DisplayController({ identifier }: { identifier: string }) {
    useEffect(() => {
        console.log("display controller mounted");

        return () => {
            console.log("display controller unmounted");
        };
    });

    api.displays.onStreamMessage.useSubscription(
        { identifier },
        {
            onData: (message) => {
                console.log(message);
            },
        }
    );

    return <></>;
}

