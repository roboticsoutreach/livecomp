import { appDb } from "../../../db/db";
import { Repository } from "../../../db/repository";
import type { AppSchema } from "../../../db/schema";
import { startingZones } from "../../../db/schema/games";

class StartingZonesRepository extends Repository<AppSchema, AppSchema["startingZones"], "startingZones"> {}

export const startingZonesRepository = new StartingZonesRepository(appDb, startingZones);

