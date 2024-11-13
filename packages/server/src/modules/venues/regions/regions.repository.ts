import { appDb } from "../../../db/db";
import { Repository } from "../../../db/repository";
import type { AppSchema } from "../../../db/schema";
import { regions, type Region } from "../../../db/schema/venues";
import { stream } from "../../../trpc/stream";

class RegionsRepository extends Repository<AppSchema, AppSchema["regions"], "regions"> {
    async afterCreate() {
        stream.broadcastInvalidateMessage("regions", "fetchAll");
    }

    async afterUpdate(row: Region) {
        stream.broadcastInvalidateMessage("regions", "fetchAll");
        stream.broadcastInvalidateMessage("regions", "fetchById", { id: row.id });
        stream.broadcastInvalidateMessage("regions", "fetchAllByVenueId", { venueId: row.venueId });
    }

    async afterDelete() {
        stream.broadcastInvalidateMessage("regions", "fetchAll");
    }
}

export const regionsRepository = new RegionsRepository(appDb, regions);

