import jwt from "@elysiajs/jwt";
import { t } from "elysia";

export const accessTokenJwt = jwt({
    name: "accessToken",
    secret: Bun.env.ACCESS_TOKEN_SECRET,
    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }),
});

export const refreshTokenJwt = jwt({
    name: "refreshToken",
    secret: Bun.env.REFRESH_TOKEN_SECRET,
    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }),
});

