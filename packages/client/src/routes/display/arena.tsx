import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/display/arena")({
    component: RouteComponent,
});

function RouteComponent() {
    const [secondsRemaining, setSecondsRemaining] = useState(120);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className="w-screen h-screen flex">
            <div className="w-1/4 h-full bg-orange-600"></div>
            <div className="w-2/4 h-full flex flex-col justify-center relative">
                <div className="my-16">
                    <h2 className="text-white font-semibold text-5xl text-center">Starting in</h2>
                    <h1 className="text-white font-bold font-mono text-8xl text-center">
                        {Math.floor(secondsRemaining / 60)
                            .toString()
                            .padStart(2, "0")}
                        :{(secondsRemaining % 60).toString().padStart(2, "0")}
                    </h1>
                </div>
                <div className="my-16">
                    <h1 className="text-white font-bold text-8xl text-center">SRO</h1>
                    <h2 className="text-white font-semibold text-5xl text-center">Southampton Robotics Outreach</h2>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/5 flex flex-row">
                    <div className="w-1/3 h-full flex flex-row">
                        <div className="w-1/4 h-full bg-green-600"></div>
                        <div className="w-2/4 h-full flex flex-col justify-center">
                            <h1 className="text-white font-bold text-3xl text-center">ABC</h1>
                        </div>
                        <div className="w-1/4 h-full bg-green-600"></div>
                    </div>
                    <div className="w-1/3 h-full flex flex-row">
                        <div className="w-1/4 h-full bg-yellow-600"></div>
                        <div className="w-2/4 h-full flex flex-col justify-center">
                            <h1 className="text-white font-bold text-3xl text-center">XYZ</h1>
                        </div>
                        <div className="w-1/4 h-full bg-yellow-600"></div>
                    </div>
                    <div className="w-1/3 h-full flex flex-row">
                        <div className="w-1/4 h-full bg-pink-600"></div>
                        <div className="w-2/4 h-full flex flex-col justify-center">
                            <h1 className="text-white font-bold text-3xl text-center">TUV</h1>
                        </div>
                        <div className="w-1/4 h-full bg-pink-600"></div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-full bg-orange-600"></div>
        </div>
    );
}

