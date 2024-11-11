import { authRouter } from "../modules/auth/auth.router";
import { gamesRouter } from "../modules/games/games.router";
import { router } from "./trpc";

export const appRouter = router({
    auth: authRouter,
    games: gamesRouter,
});

