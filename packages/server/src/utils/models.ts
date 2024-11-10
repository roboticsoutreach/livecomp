import type Elysia from "elysia";
import { userSchema } from "../db/schema/auth";
import { competitionSchema } from "../db/schema/competitions";

export const models = (app: Elysia) => app.model("user", userSchema).model("competition", competitionSchema);

