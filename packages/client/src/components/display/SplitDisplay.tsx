import { PropsWithChildren } from "react";

export default function SplitDisplay({ children }: PropsWithChildren) {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-2/3 h-full p-4">{children}</div>
            <div className="w-1/3 h-full border-l-2 flex flex-col">
                <div className="text-white text-4xl p-4 font-bold bg-slate-600">Next matches</div>

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
                        {[...Array(10).keys()].map((i) => {
                            const shadeLeft = i % 2 === 0;

                            return (
                                <tr key={i}>
                                    <td className={`p-2 text-lg text-white ${shadeLeft ? "bg-slate-800" : ""}`}>
                                        T{(i * 3 + 1).toString().padStart(2, "0")}
                                    </td>
                                    <td
                                        className={`p-2 text-lg text-white font-mono ${shadeLeft ? "bg-slate-800" : ""}`}
                                    >
                                        14:35
                                    </td>
                                    <td className={`p-2 text-lg text-white ${!shadeLeft ? "bg-slate-800" : ""}`}>
                                        T{(i * 3 + 2).toString().padStart(2, "0")}
                                    </td>
                                    <td
                                        className={`p-2 text-lg text-white font-mono ${!shadeLeft ? "bg-slate-800" : ""}`}
                                    >
                                        14:35
                                    </td>
                                    <td className={`p-2 text-lg text-white ${shadeLeft ? "bg-slate-800" : ""}`}>
                                        T{(i * 3 + 3).toString().padStart(2, "0")}
                                    </td>
                                    <td
                                        className={`p-2 text-lg text-white font-mono ${shadeLeft ? "bg-slate-800" : ""}`}
                                    >
                                        14:35
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <table className="w-full my-auto">
                    <tr>
                        <td className="w-1/2">
                            <h1 className="text-white font-bold text-4xl p-4 text-center">
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
                                        <div className="bg-orange-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T01</h2>
                                        </div>
                                        <div className="bg-green-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T02</h2>
                                        </div>
                                        <div className="bg-pink-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T03</h2>
                                        </div>
                                        <div className="bg-yellow-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T04</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <table className="w-full my-auto">
                    <tr>
                        <td className="w-1/2">
                            <h1 className="text-white font-bold text-4xl p-4 text-center">
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
                                        <div className="bg-orange-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T05</h2>
                                        </div>
                                        <div className="bg-green-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T06</h2>
                                        </div>
                                        <div className="bg-pink-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T07</h2>
                                        </div>
                                        <div className="bg-yellow-600 content-center">
                                            <h2 className="text-white font-bold text-3xl text-center">T08</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div className="text-white text-4xl p-4 font-semibold bg-slate-600 border-t-2 border-white">
                    <span className="float-start">Time</span>
                    <span className="float-end font-mono">13:22</span>
                </div>
            </div>
        </div>
    );
}

