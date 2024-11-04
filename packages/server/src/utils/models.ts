import type Elysia from "elysia";
import { User } from "../../schema/prisma/prismabox/User";

export const models = (app: Elysia) => app.model("User", User);

