import Elysia from "elysia";
import { optionalAuthMiddleware } from "./optionalAuth.middleware";

export const authMiddleware = (app: Elysia) =>
    app.use(optionalAuthMiddleware).derive(async ({ error, user }) => {
        if (!user) {
            return error(401, { message: "Unauthorized" });
        }

        return { user };
    });

