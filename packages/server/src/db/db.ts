import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema, type AppSchema } from "./schema";
import type { AppDb } from "./repository";
import type { Schema } from "zod";

const connection = postgres(Bun.env.DATABASE_URL);
export const drizzleClient = drizzle(connection, { schema, casing: "snake_case" });

export const appDb: AppDb<AppSchema> = {
    orm: drizzleClient,
    schema,
    url: Bun.env.DATABASE_URL,
};

