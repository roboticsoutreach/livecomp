import { appDb } from "../../../db/db";
import { Repository } from "../../../db/repository";
import type { AppSchema } from "../../../db/schema";
import { regions, type Region } from "../../../db/schema/venues";
import { stream } from "../../../trpc/stream";

class RegionsRepository extends Repository<AppSchema, AppSchema["regions"], "regions"> {}

export const regionsRepository = new RegionsRepository(appDb, regions);

