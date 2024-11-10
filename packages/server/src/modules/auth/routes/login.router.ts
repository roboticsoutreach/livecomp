import Elysia, { t } from "elysia";
import { database } from "../../../db/db";
import { authModule } from "../auth.module";
import { errors } from "../../../utils/schema";
import { authJwts } from "../../../utils/jwt";

export const loginRouter = new Elysia({ prefix: "login" })
    .use(database)
    .use(authJwts)
    .post(
        "credentials",
        async ({
            error,
            body: { username, password },
            db,
            accessTokenJwt,
            refreshTokenJwt,
            cookie: { accessToken: accessTokenCookie, refreshToken: refreshTokenCookie },
        }) => {
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.username, username),
                with: {
                    password: true,
                },
            });

            console.log("yay");

            if (!user) {
                return error(404, { message: "No user found with that username" });
            }

            if (!user.password) {
                return error(403, { message: "User does not have a password" });
            }

            if (!(await Bun.password.verify(password, user.password.passwordHash))) {
                return error(401, { message: "Incorrect password" });
            }

            const now = Date.now() / 1000;

            const accessTokenExpiresAt = now + authModule.ACCESS_TOKEN_DURATION;
            const refreshTokenExpiresAt = now + authModule.REFRESH_TOKEN_DURATION;

            const signedAccessToken = await accessTokenJwt.sign({
                userId: user.id,
                expiresAt: accessTokenExpiresAt,
            });

            const signedRefreshToken = await refreshTokenJwt.sign({
                userId: user.id,
                expiresAt: refreshTokenExpiresAt,
            });

            accessTokenCookie.set({
                httpOnly: true,
                secure: false,
                maxAge: authModule.ACCESS_TOKEN_DURATION,
                value: signedAccessToken,
            });
            refreshTokenCookie.set({
                httpOnly: true,
                secure: false,
                maxAge: authModule.REFRESH_TOKEN_DURATION,
                value: signedRefreshToken,
            });

            return {};
        },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
            }),
            response: {
                200: t.Object({}),
                ...errors(404, 403, 401),
            },
            detail: {
                operationId: "loginWithCredentials",
                summary: "Log in with credentials",
            },
        }
    );

