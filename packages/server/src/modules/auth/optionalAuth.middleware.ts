import Elysia from "elysia";
import { accessTokenJwt, refreshTokenJwt } from "../../utils/jwt";
import type { User } from "@prisma/client";
import { prisma } from "../../db/db";
import { authModule } from "./auth.module";
import { log } from "../../utils/log";

export const optionalAuthMiddleware = (app: Elysia) =>
    app
        .use(prisma)
        .use(accessTokenJwt)
        .use(refreshTokenJwt)
        .derive(async ({ db, error, cookie: { accessToken, refreshToken }, accessTokenJwt, refreshTokenJwt }) => {
            if (!accessToken.value) {
                log.info("No access token found");
                return;
            }

            const verifiedAccessToken = (await accessTokenJwt.verify(accessToken.value)) as
                | false
                | { userId: string; expiresAt: number };

            if (!verifiedAccessToken) {
                log.info("Access token not verified");
                return;
            }

            const now = Date.now() / 1000;

            if (verifiedAccessToken.expiresAt > now) {
                const verifiedRefreshToken = (await refreshTokenJwt.verify(refreshToken.value)) as
                    | false
                    | { userId: string; expiresAt: number };

                if (!verifiedRefreshToken || verifiedRefreshToken.expiresAt > now) {
                    log.info("Refresh token not verified");
                    return;
                }

                const newAccessToken = await accessTokenJwt.sign({
                    userId: verifiedRefreshToken.userId,
                    expiresAt: now + authModule.ACCESS_TOKEN_DURATION,
                });

                accessToken.set({
                    httpOnly: true,
                    secure: false,
                    maxAge: authModule.ACCESS_TOKEN_DURATION,
                    value: newAccessToken,
                });

                error(401, { message: "Access token has expired. New token issued, retry request." });
                return;
            }

            const user = await db.user.findFirst({
                where: { id: verifiedAccessToken.userId },
            });

            if (!user) {
                log.info("User not found");
                return;
            }

            return { user };
        });

