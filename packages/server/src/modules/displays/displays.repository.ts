import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { displays } from "../../db/schema/displays";

class DisplaysRepository extends Repository<AppSchema, AppSchema["displays"], "displays"> {}

export const displaysRepository = new DisplaysRepository(appDb, displays);
