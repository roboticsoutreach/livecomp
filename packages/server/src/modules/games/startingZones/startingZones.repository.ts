import { appDb } from "../../../db/db";
import { Repository } from "../../../db/repository";
import type { AppSchema } from "../../../db/schema";
import { startingZones, type StartingZone } from "../../../db/schema/games";
import { stream } from "../../../trpc/stream";

class StartingZonesRepository extends Repository<AppSchema, AppSchema["startingZones"], "startingZones"> {
    async afterCreate(row: StartingZone) {
        stream.broadcastInvalidateMessage("startingZones", "fetchAll");
    }

    async afterUpdate(row: StartingZone) {
        stream.broadcastInvalidateMessage("startingZones", "fetchAll");
        stream.broadcastInvalidateMessage("startingZones", "fetchById", { id: row.id });
    }

    async afterDelete(row: StartingZone) {
        stream.broadcastInvalidateMessage("startingZones", "fetchAll");
    }
}

export const startingZonesRepository = new StartingZonesRepository(appDb, startingZones);

