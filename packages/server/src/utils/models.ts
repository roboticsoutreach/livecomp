import type Elysia from "elysia";
import { User, UserPlain } from "../../schema/prisma/prismabox/User";
import { CompetitionPlain } from "../../schema/prisma/prismabox/Competition";

export const models = (app: Elysia) => app.model("User", UserPlain).model("Competition", CompetitionPlain);

