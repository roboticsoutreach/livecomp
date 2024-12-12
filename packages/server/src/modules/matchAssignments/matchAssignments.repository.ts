import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { matchAssignments } from "../../db/schema/matches";

class MatchAssignmentsRepository extends Repository<AppSchema, AppSchema["matchAssignments"], "matchAssignments"> {}

export const matchAssingmentsRepository = new MatchAssignmentsRepository(appDb, matchAssignments);
