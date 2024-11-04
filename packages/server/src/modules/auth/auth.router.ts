import Elysia, { t } from "elysia";
import { prisma } from "../../db/db";
import { accessTokenJwt, refreshTokenJwt } from "../../utils/jwt";
import { errors, errorSchema } from "../../utils/schema";
import { loginWithCredentialsRoute } from "./routes/loginWithCredentials.route";

export const authRouter = new Elysia({
    prefix: "auth",
    detail: {
        tags: ["Auth"],
    },
}).use(loginWithCredentialsRoute);

