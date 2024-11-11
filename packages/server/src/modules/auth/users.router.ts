import { protectedProcedure, router } from "../../trpc/trpc";

export const usersRouter = router({
    fetchCurrent: protectedProcedure.query(({ ctx }) => ctx.user),
});
