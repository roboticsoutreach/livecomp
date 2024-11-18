import { authRouter } from "./modules/auth/auth.router";
import { usersRouter } from "./modules/auth/users.router";
import { competitionsRouter } from "./modules/competitions/competitions.router";
import { gamesRouter } from "./modules/games/games.router";
import { startingZonesRouter } from "./modules/games/startingZones/startingZones.router";
import { regionsRouter } from "./modules/venues/regions/regions.router";
import { shepherdsRouter } from "./modules/venues/sheperds/shepherds.router";
import { venuesRouter } from "./modules/venues/venues.router";
import { streamRouter } from "./trpc/stream";
import { router } from "./trpc/trpc";

export const appRouter = router({
    stream: streamRouter,
    auth: authRouter,
    users: usersRouter,
    games: gamesRouter,
    startingZones: startingZonesRouter,
    venues: venuesRouter,
    regions: regionsRouter,
    shepherds: shepherdsRouter,
    competitions: competitionsRouter,
});

