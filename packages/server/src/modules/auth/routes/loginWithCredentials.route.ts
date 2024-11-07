import Elysia, { t } from "elysia";
import { prisma } from "../../../db/db";
import { accessTokenJwt, refreshTokenJwt } from "../../../utils/jwt";
import { authModule } from "../auth.module";
import { errors } from "../../../utils/schema";

export const loginWithCredentialsRoute = new Elysia()
    .use(prisma)
    .use(accessTokenJwt)
    .use(refreshTokenJwt)
    .post(
        "login/credentials",
        async ({
            error,
            body: { email, password },
            db,
            accessToken,
            refreshToken,
            cookie: { accessToken: accessTokenCookie, refreshToken: refreshTokenCookie },
        }) => {
            const user = await db.user.findUnique({
                where: { email },
                include: { password: { select: { passwordHash: true } } },
            });

            if (!user) {
                return error(404, { message: "No user found with that email address" });
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

            const signedAccessToken = await accessToken.sign({
                userId: user.id,
                expiresAt: accessTokenExpiresAt,
            });

            const signedRefreshToken = await refreshToken.sign({
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
                email: t.String(),
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

