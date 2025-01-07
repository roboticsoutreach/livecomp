import { PropsWithChildren, useMemo } from "react";
import useDateTime from "../../hooks/useDate";
import { api } from "../../utils/trpc";
import { array } from "../../utils/array";
import { AppRouterOutput } from "@livecomp/server";

export default function SplitDisplay({
    competition,
    children,
}: { competition?: AppRouterOutput["competitions"]["fetchByShortName"] } & PropsWithChildren) {
    const time = useDateTime();

    const { data: teams } = api.teams.fetchAll.useQuery({ filters: { competitionId: competition?.id ?? "" } });
    const chunkedTeams = useMemo(() => [...array.chunk(teams ?? [], 3)], [teams]);

    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-2/3 h-full p-4">{children}</div>
            <div className="w-1/3 h-full border-l-2 flex flex-col">
                <div className="text-white text-3xl p-4 font-bold bg-slate-600">Next matches</div>

                <table className="w-full border-b-2 border-white">
                    <thead className="bg-slate-600">
                        <tr>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Team</th>
                            <th className="w-1/6 p-2 text-left text-2xl text-white">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {chunkedTeams.map((chunk, i) => {
                            const shadeLeft = i % 2 === 0;

                            return (
                                <tr key={i}>
                                    {chunk.map((team) => {
                                        return (
                                            <>
                                                <td
                                                    key={team.id}
                                                    className={`p-2 text-lg text-white ${
                                                        shadeLeft ? "bg-slate-800" : ""
                                                    }`}
                                                >
                                                    {team.shortName}
                                                </td>
                                                <td
                                                    key={team.id + "time"}
                                                    className={`p-2 text-lg text-white ${
                                                        !shadeLeft ? "bg-slate-800" : ""
                                                    }`}
                                                >
                                                    ??:??
                                                </td>
                                            </>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <table className="w-full my-auto">
                    <tr>
                        <td className="w-1/2">
                            <h1 className="text-white font-bold text-3xl p-4 text-center">
                                Current
                                <br />
                                match
                            </h1>
                        </td>
                        <td className="w-1/2">
                            <div className="w-auto h-1/5 p-2 m-6 border-2 flex flex-col gap-2">
                                <h1 className="text-white text-xl font-semibold">
                                    <span className="float-start">Match 0</span>
                                    <span className="float-end">13:45</span>
                                </h1>
                                <div className="flex-grow">
                                    <div className="w-full h-full grid grid-cols-2">
                                        {competition?.game.startingZones.map((zone) => (
                                            <div
                                                key={zone.id}
                                                className="content-center"
                                                style={{ backgroundColor: zone.color }}
                                            >
                                                <h2
                                                    className="text-white font-bold text-3xl text-center"
                                                    style={{ WebkitTextStroke: "1px #222222" }}
                                                >
                                                    ABC
                                                </h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <table className="w-full my-auto">
                    <tr>
                        <td className="w-1/2">
                            <h1 className="text-white font-bold text-3xl p-4 text-center">
                                Next
                                <br />
                                match
                            </h1>
                        </td>
                        <td className="w-1/2">
                            <div className="w-auto h-1/5 p-2 m-6 border-2 flex flex-col gap-2">
                                <h1 className="text-white text-xl font-semibold">
                                    <span className="float-start">Match 1</span>
                                    <span className="float-end">13:50</span>
                                </h1>
                                <div className="flex-grow">
                                    <div className="w-full h-full grid grid-cols-2">
                                        {competition?.game.startingZones.map((zone) => (
                                            <div
                                                key={zone.id}
                                                className="content-center"
                                                style={{ backgroundColor: zone.color }}
                                            >
                                                <h2
                                                    className="text-white text- font-bold text-3xl text-center"
                                                    style={{ WebkitTextStroke: "1px #222222" }}
                                                >
                                                    ABC
                                                </h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div className="text-white text-3xl p-4 font-semibold bg-slate-600 border-t-2 border-white">
                    <span className="float-start">Time</span>
                    <span className="float-end font-mono">{time.toFormat("HH:mm:ss")}</span>
                </div>
            </div>
        </div>
    );
}

