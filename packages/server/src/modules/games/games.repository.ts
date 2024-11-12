import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { games } from "../../db/schema/games";

class GamesRepository extends Repository<AppSchema, AppSchema["games"], "games"> {}

export const gamesRepository = new GamesRepository(appDb, games);

