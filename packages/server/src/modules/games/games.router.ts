import Elysia, { t } from "elysia";
import { authMiddleware } from "../auth/auth.middleware";
import { database } from "../../db/db";
import { games, gameSchema, insertGameSchema } from "../../db/schema/games";
import { errors } from "../../utils/schema";
import { eq } from "drizzle-orm";

export const gamesRouter = new Elysia({ prefix: "games", tags: ["Games"] })
    .use(database)
    .use(authMiddleware)
    .post(
        "",
        async ({ db, body: { data } }) => {
            const createdGames = await db.insert(games).values(data).returning();

            return { game: createdGames[0] };
        },
        {
            body: t.Object({
                data: insertGameSchema,
            }),
            response: {
                200: t.Object({
                    game: gameSchema,
                }),
            },
            detail: {
                operationId: "createGame",
                summary: "Create game",
            },
        }
    )
    .get(
        "",
        async ({ db }) => {
            return { games: await db.query.games.findMany() };
        },
        {
            response: {
                200: t.Object({
                    games: t.Array(gameSchema),
                }),
            },
            detail: {
                operationId: "listGames",
                summary: "List games",
            },
        }
    )
    .get(
        "/:id",
        async ({ db, params: { id }, error }) => {
            const game = await db.query.games.findFirst({ where: (games, { eq }) => eq(games.id, id) });

            if (!game) {
                return error(404, { message: "Game not found" });
            }

            return { game };
        },
        {
            response: {
                200: t.Object({
                    game: gameSchema,
                }),
                ...errors(404),
            },
            detail: {
                operationId: "fetchGameById",
                summary: "Fetch game by ID",
            },
        }
    )
    .patch(
        "/:id",
        async ({ db, params: { id }, body: { data }, error }) => {
            const updatedGames = await db.update(games).set(data).where(eq(games.id, id)).returning();

            if (!updatedGames.length) {
                return error(404, { message: "Game not found" });
            }

            return { game: updatedGames[0] };
        },
        {
            body: t.Object({
                data: t.Partial(insertGameSchema),
            }),
            response: {
                200: t.Object({
                    game: gameSchema,
                }),
                ...errors(404),
            },
            detail: {
                operationId: "updateGame",
                summary: "Update game",
            },
        }
    )
    .delete(
        "/:id",
        async ({ db, params: { id }, error }) => {
            const deletedGames = await db.delete(games).where(eq(games.id, id)).returning();

            if (!deletedGames.length) {
                return error(404, { message: "Game not found" });
            }

            return {};
        },
        {
            response: {
                200: t.Object({}),
                ...errors(404),
            },
            detail: {
                operationId: "deleteGame",
                summary: "Delete game",
            },
        }
    );

