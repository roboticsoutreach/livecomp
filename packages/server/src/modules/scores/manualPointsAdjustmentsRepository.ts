import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { manualPointsAdjustments } from "../../db/schema/scores";

class ManualPointsAdjustmentsRepository extends Repository<
    AppSchema,
    AppSchema["manualPointsAdjustments"],
    "manualPointsAdjustments"
> {}

export const manualPointsAdjustmentsRepository = new ManualPointsAdjustmentsRepository(appDb, manualPointsAdjustments);
