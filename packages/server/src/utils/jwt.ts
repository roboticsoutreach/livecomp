import { jwt } from "@elysiajs/jwt";
import type { TObject } from "@sinclair/typebox";
import { t } from "elysia";

// Strange hack in here to make TypeBox happy

export const accessTokenJwt = jwt({
    name: "accessToken",
    secret: Bun.env.ACCESS_TOKEN_SECRET,

    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

export const refreshTokenJwt = jwt({
    name: "refreshToken",
    secret: Bun.env.REFRESH_TOKEN_SECRET,

    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

