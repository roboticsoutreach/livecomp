import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { competitions, type Competition } from "../../db/schema/competitions";
import { stream } from "../../trpc/stream";

class CompetitionsRepository extends Repository<AppSchema, AppSchema["competitions"], "competitions"> {
    async afterCreate() {}

    async afterUpdate(row: Competition) {}

    async afterDelete() {}
}

export const competitionsReponsitory = new CompetitionsRepository(appDb, competitions);

