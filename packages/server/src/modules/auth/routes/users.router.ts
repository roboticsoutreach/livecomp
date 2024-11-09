import Elysia, { t } from "elysia";
import { UserPlain } from "../../../../schema/prisma/prismabox/User";
import { optionalAuthMiddleware } from "../optionalAuth.middleware";

export const usersRouter = new Elysia({ prefix: "users", tags: ["Users"] })
    .use(optionalAuthMiddleware)
    .get("current", ({ user }) => ({ user }), {
        response: {
            200: t.Object({
                user: t.Optional(UserPlain),
            }),
        },
        detail: {
            operationId: "getCurrentUser",
            summary: "Get the current user",
        },
    });

