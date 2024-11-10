import { PrismaClient } from "@prisma/client";
import type Elysia from "elysia";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";

const connection = postgres(Bun.env.DATABASE_URL);
const drizzleClient = drizzle(connection, { schema, casing: "snake_case" });

export const database = (app: Elysia) => app.decorate("db", drizzleClient);

