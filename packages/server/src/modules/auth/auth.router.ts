import Elysia, { t } from "elysia";
import { prisma } from "../../db/db";
import { accessTokenJwt, refreshTokenJwt } from "../../utils/jwt";
import { errors, errorSchema } from "../../utils/schema";
import { loginRouter } from "./routes/login.router";
import { usersRouter } from "./routes/users.router";

export const authRouter = new Elysia({
    prefix: "auth",
    detail: {
        tags: ["Auth"],
    },
})
    .use(loginRouter)
    .use(usersRouter);

