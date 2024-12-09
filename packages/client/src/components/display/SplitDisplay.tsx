import { PropsWithChildren } from "react";

const matches = [
    {
        name: "Match 0",
        time: "13:45",
        teams: ["ABC", "XYZ", "TUV", "DEF"],
    },
    {
        name: "Match 1",
        time: "13:50",
        teams: ["ABC", "XYZ", "TUV", "DEF"],
    },
    {
        name: "Match 2",
        time: "13:55",
        teams: ["ABC", "XYZ", "TUV", "DEF"],
    },
    {
        name: "Match 3",
        time: "14:00",
        teams: ["ABC", "XYZ", "TUV", "DEF"],
    },
    {
        name: "Match 4",
        time: "14:05",
        teams: ["ABC", "XYZ", "TUV", "DEF"],
    },
] satisfies {
    name: string;
    time: string;
    teams: string[];
}[];

export default function SplitDisplay({ children }: PropsWithChildren) {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-4/5 h-full p-4">{children}</div>
            <div className="w-1/5 h-full p-4 border-l-2 flex flex-col">
                <h1 className="text-white text-4xl font-bold mb-4">Upcoming matches</h1>
                <h2 className="text-white text-xl mb-4">Staging closes at the time specified for each match.</h2>
                <div className="flex flex-grow flex-col gap-4">
                    {matches.map((match) => (
                        <div
                            key={match.name}
                            className={`w-full h-1/5 p-2 border-2 flex flex-col gap-2 transition-all duration-500 ease-in-out ${match.name === "Match 0" ? "bg-red-400" : ""}`}
                        >
                            <h1 className="text-white text-xl font-semibold">
                                {match.name} <span className="float-end">{match.time}</span>
                            </h1>

                            <div className="flex-grow">
                                <div className="w-full h-full grid grid-cols-2">
                                    <div className="bg-orange-600 content-center">
                                        <h2 className="text-white font-bold text-3xl text-center">{match.teams[0]}</h2>
                                    </div>
                                    <div className="bg-green-600 content-center">
                                        <h2 className="text-white font-bold text-3xl text-center">{match.teams[1]}</h2>
                                    </div>
                                    <div className="bg-pink-600 content-center">
                                        <h2 className="text-white font-bold text-3xl text-center">{match.teams[2]}</h2>
                                    </div>
                                    <div className="bg-yellow-600 content-center">
                                        <h2 className="text-white font-bold text-3xl text-center">{match.teams[3]}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

