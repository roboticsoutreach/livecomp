import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { type MatchPeriod, matchPeriods } from "../../db/schema/matches";
import { stream } from "../../trpc/stream";

class MatchPeriodsRepository extends Repository<AppSchema, AppSchema["matchPeriods"], "matchPeriods"> {
    async afterCreate(row: MatchPeriod) {
        stream.broadcastInvalidateMessage("matchPeriods", "fetchAll");
        stream.broadcastInvalidateMessage("matchPeriods", "fetchActiveByCompetitionId", {
            competitionId: row.competitionId,
        });
    }

    async afterUpdate(row: MatchPeriod) {
        stream.broadcastInvalidateMessage("matchPeriods", "fetchAll");
        stream.broadcastInvalidateMessage("matchPeriods", "fetchById", { id: row.id });
        stream.broadcastInvalidateMessage("matchPeriods", "fetchActiveByCompetitionId", {
            competitionId: row.competitionId,
        });
    }

    async afterDelete(row: MatchPeriod) {
        stream.broadcastInvalidateMessage("matchPeriods", "fetchAll");
        stream.broadcastInvalidateMessage("matchPeriods", "fetchById", { id: row.id });
        stream.broadcastInvalidateMessage("matchPeriods", "fetchActiveByCompetitionId", {
            competitionId: row.competitionId,
        });
    }
}

export const matchPeriodsRepository = new MatchPeriodsRepository(appDb, matchPeriods);

