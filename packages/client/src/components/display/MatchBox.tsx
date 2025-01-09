import { StartingZone } from "@livecomp/server/src/db/schema/games";
import { MatchAssignment } from "@livecomp/server/src/db/schema/matches";
import { Team } from "@livecomp/server/src/db/schema/teams";

export default function MatchBox({
    matchName,
    matchStart,
    startingZones,
    assignments,
}: {
    matchName: string;
    matchStart: string;
    startingZones: StartingZone[];
    assignments: (MatchAssignment & { team?: Team | null })[];
}) {
    return (
        <div className="w-auto h-1/5 p-2 m-6 border-2 flex flex-col gap-2">
            <h1 className="text-white text-xl font-semibold">
                <span className="float-start">{matchName}</span>
                <span className="float-end">{matchStart}</span>
            </h1>
            <div className="flex-grow">
                <div className="w-full h-full grid grid-cols-2">
                    {startingZones.map((zone) => (
                        <div key={zone.id} className="content-center" style={{ backgroundColor: zone.color }}>
                            <h2 className="text-black font-bold text-3xl text-center">
                                {assignments.find((assignment) => assignment.startingZoneId === zone.id)?.team
                                    ?.shortName ?? "???"}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

