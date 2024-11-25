import { z } from "zod";
import { protectedProcedure, router } from "../../../trpc/trpc";
import { usersRepository } from "./users.repository";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { userPasswords, users } from "../../../db/schema/auth";

export const usersRouter = router({
    fetchCurrent: protectedProcedure.query(({ ctx }) => ctx.user),

    changePassword: protectedProcedure
        .input(z.object({ currentPassword: z.string(), newPassword: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const user = await usersRepository.findFirst({
                where: eq(users.id, ctx.user.id),
                with: { password: true },
            });

            if (!user?.password) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Password not found" });
            }

            if (!(await Bun.password.verifySync(input.currentPassword, user.password?.passwordHash))) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
            }

            await ctx.db
                .update(userPasswords)
                .set({ passwordHash: await Bun.password.hash(input.newPassword) })
                .where(eq(userPasswords.userId, ctx.user.id));
        }),
});

