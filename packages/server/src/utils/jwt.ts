import { jwt } from "@elysiajs/jwt";
import type { TObject } from "@sinclair/typebox";
import { t, type Static } from "elysia";
import { User } from "../../schema/prisma/prismabox/User";

export const accessTokenJwt = jwt({
    name: "accessTokenJwt",
    secret: Bun.env.ACCESS_TOKEN_SECRET,

    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

export const refreshTokenJwt = jwt({
    name: "refreshTokenJwt",
    secret: Bun.env.REFRESH_TOKEN_SECRET,

    schema: t.Object({
        userId: t.String(),
        expiresAt: t.Number(),
    }) as unknown as TObject & { "[Kind]": "Object" },
});

