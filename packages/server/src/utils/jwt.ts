import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

const jwtSchema = t.Object({
    userId: t.String(),
    expiresAt: t.Number(),
});

export const authJwts = (app: Elysia) =>
    app
        .use(
            jwt({
                name: "accessTokenJwt",
                secret: Bun.env.ACCESS_TOKEN_SECRET,
                schema: jwtSchema,
            })
        )
        .use(
            jwt({
                name: "refreshTokenJwt",
                secret: Bun.env.REFRESH_TOKEN_SECRET,
                schema: jwtSchema,
            })
        );

