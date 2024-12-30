import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { autoMatchAssignmentConfigs, type AutoMatchAssignmentConfig } from "../../db/schema/matches";
import { stream } from "../../trpc/stream";

class AutoMatchAssignmentConfigsRepository extends Repository<
    AppSchema,
    AppSchema["autoMatchAssignmentConfigs"],
    "autoMatchAssignmentConfigs"
> {
    async afterCreate() {
        stream.broadcastInvalidateMessage("matches", "fetchAll");
        stream.broadcastInvalidateMessage("matches", "fetchById");
    }

    async afterUpdate(row: AutoMatchAssignmentConfig) {
        stream.broadcastInvalidateMessage("matches", "fetchAll");
        stream.broadcastInvalidateMessage("matches", "fetchById");
    }

    async afterDelete(row: AutoMatchAssignmentConfig) {
        stream.broadcastInvalidateMessage("matches", "fetchAll");
        stream.broadcastInvalidateMessage("matches", "fetchById");
    }
}

export const autoMatchAssignmentConfigsRepository = new AutoMatchAssignmentConfigsRepository(
    appDb,
    autoMatchAssignmentConfigs
);

