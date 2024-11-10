import type Elysia from "elysia";
import { insertUserSchema, userSchema } from "../db/schema/auth";
import { competitionSchema, insertCompetitionSchema } from "../db/schema/competitions";
import { gameSchema, insertGameSchema } from "../db/schema/games";

export const models = (app: Elysia) =>
    app
        .model("user", userSchema)
        .model("insertUser", insertUserSchema)
        .model("competition", competitionSchema)
        .model("insertCompetition", insertCompetitionSchema)
        .model("game", gameSchema)
        .model("insertGame", insertGameSchema);

