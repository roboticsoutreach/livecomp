import Elysia, { t } from "elysia";
import { database } from "../../db/db";
import { competitionSchema } from "../../db/schema/competitions";

export const competitionsRouter = new Elysia({ prefix: "competitions", tags: ["Competitions"] }).use(database).get(
    "",
    async ({ db }) => {
        return { competitions: await db.query.competitions.findMany() };
    },
    {
        response: {
            200: t.Object({ competitions: t.Array(competitionSchema) }),
        },
        detail: {
            operationId: "listCompetitions",
            summary: "List competitions",
        },
    }
);

