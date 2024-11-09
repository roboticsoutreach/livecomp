import { jwt } from "@elysiajs/jwt";
import type { TObject } from "@sinclair/typebox";
import { t, type Static } from "elysia";
import { User } from "../../schema/prisma/prismabox/User";

export const accessTokenJwt = jwt({
    name: "accessToken",
    secret: Bun.env.ACCESS_TOKEN_SECRET,

    schema: t.Object({
        user: User,
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

export const refreshTokenJwt = jwt({
    name: "refreshToken",
    secret: Bun.env.REFRESH_TOKEN_SECRET,

    schema: t.Object({
        user: User,
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

