import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc/trpc";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema/auth";
import { TRPCError } from "@trpc/server";
import * as jose from "jose";
import { auth } from "./auth.module";

export const authRouter = router({
    login: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input: { username, password } }) => {
            const user = await ctx.db.query.users.findFirst({
                where: eq(users.username, username),
                with: { password: true },
            });

            if (!user) {
                throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
            }

            if (!user.password) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User has no password" });
            }

            const passwordMatch = await Bun.password.verify(password, user.password?.passwordHash);

            if (!passwordMatch) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid password" });
            }

            const token = await new jose.SignJWT({ userId: user.id })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setIssuer("livecomp:server")
                .setAudience("livecomp:client")
                .setExpirationTime("5d")
                .sign(auth.encodedSecret);

            return { token };
        }),
});

