import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { type Team, teams } from "../../db/schema/teams";
import { stream } from "../../trpc/stream";

class TeamsRepository extends Repository<AppSchema, AppSchema["teams"], "teams"> {
    async afterCreate() {
        stream.broadcastInvalidateMessage("teams", "fetchAll");
    }

    async afterUpdate(row: Team) {
        stream.broadcastInvalidateMessage("teams", "fetchAll");
        stream.broadcastInvalidateMessage("teams", "fetchById", { id: row.id });
    }

    async afterDelete(row: Team) {
        stream.broadcastInvalidateMessage("teams", "fetchAll");
        stream.broadcastInvalidateMessage("teams", "fetchById", { id: row.id });
    }
}

export const teamsRepository = new TeamsRepository(appDb, teams);

