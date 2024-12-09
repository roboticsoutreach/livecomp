import { PropsWithChildren } from "react";

export default function SplitDisplay({ children }: PropsWithChildren) {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-4/5 h-full p-4">{children}</div>
            <div className="w-1/5 h-full border-l-2 flex flex-col">
                <div className="text-white text-4xl p-4 font-bold bg-slate-600">Next matches</div>

                <table className="w-full">
                    <thead className="bg-slate-600">
                        <tr>
                            <th className="w-1/4 p-4 text-left text-2xl text-white">Team</th>
                            <th className="w-1/4 p-4 text-left text-2xl text-white">Time</th>
                            <th className="w-1/4 p-4 text-left text-2xl text-white">Team</th>
                            <th className="w-1/4 p-4 text-left text-2xl text-white">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...Array(15).keys()].map((i) => {
                            const shadeLeft = i % 2 === 0;

                            return (
                                <tr key={i}>
                                    <td className={`p-4 text-lg text-white ${shadeLeft ? "bg-slate-900" : ""}`}>
                                        T{(i * 2 + 1).toString().padStart(2, "0")}
                                    </td>
                                    <td
                                        className={`p-4 text-lg text-white font-mono ${shadeLeft ? "bg-slate-900" : ""}`}
                                    >
                                        14:35
                                    </td>
                                    <td className={`p-4 text-lg text-white ${!shadeLeft ? "bg-slate-900" : ""}`}>
                                        T{(i * 2 + 2).toString().padStart(2, "0")}
                                    </td>
                                    <td
                                        className={`p-4 text-lg text-white font-mono ${!shadeLeft ? "bg-slate-900" : ""}`}
                                    >
                                        14:35
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

