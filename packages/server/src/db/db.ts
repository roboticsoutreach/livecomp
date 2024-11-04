import { PrismaClient } from "@prisma/client";
import type Elysia from "elysia";

const client = new PrismaClient();

export const prisma = (app: Elysia) => app.decorate("db", client);

