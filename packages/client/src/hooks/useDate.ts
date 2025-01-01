import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function useDateTime() {
    const [now, setNow] = useState(DateTime.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(DateTime.now());
        }, 100);

        return () => clearInterval(interval);
    });

    return now;
}

