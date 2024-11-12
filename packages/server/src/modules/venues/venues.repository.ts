import { appDb } from "../../db/db";
import { Repository } from "../../db/repository";
import type { AppSchema } from "../../db/schema";
import { venues } from "../../db/schema/venues";

class VenuesRepository extends Repository<AppSchema, AppSchema["venues"], "venues"> {}

export const venuesRepository = new VenuesRepository(appDb, venues);
