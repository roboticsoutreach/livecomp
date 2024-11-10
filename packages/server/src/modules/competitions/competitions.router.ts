import Elysia, { t } from "elysia";
import { prisma } from "../../db/db";
import { CompetitionPlain } from "../../../schema/prisma/prismabox/Competition";

export const competitionsRouter = new Elysia({ prefix: "competitions", tags: ["Competitions"] }).use(prisma).get(
    "",
    async ({ db }) => {
        return { competitions: await db.competition.findMany() };
    },
    {
        response: {
            200: t.Object({ competitions: t.Array(CompetitionPlain) }),
        },
        detail: {
            operationId: "listCompetitions",
            summary: "List competitions",
        },
    }
);

