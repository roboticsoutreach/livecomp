import { appDb } from "../../../db/db";
import { Repository } from "../../../db/repository";
import type { AppSchema } from "../../../db/schema";
import { users } from "../../../db/schema/auth";

class UsersRepository extends Repository<AppSchema, AppSchema["users"], "users"> {}

export const usersRepository = new UsersRepository(appDb, users);
