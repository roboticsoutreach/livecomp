import Elysia, { t } from "elysia";
import { optionalAuthMiddleware } from "../optionalAuth.middleware";
import { userSchema } from "../../../db/schema/auth";

export const usersRouter = new Elysia({ prefix: "users", tags: ["Users"] })
    .use(optionalAuthMiddleware)
    .get("current", ({ user }) => ({ user }), {
        response: {
            200: t.Object({
                user: t.Optional(userSchema),
            }),
        },
        detail: {
            operationId: "getCurrentUser",
            summary: "Get the current user",
        },
    });

