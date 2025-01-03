import { authRouter } from "./modules/auth/auth.router";
import { competitionsRouter } from "./modules/competitions/competitions.router";
import { devToolsRouter } from "./modules/devTools/devTools.router";
import { gamesRouter } from "./modules/games/games.router";
import { matchesRouter } from "./modules/matches/matches.router";
import { matchPeriodsRouter } from "./modules/matchPeriods/matchPeriods.router";
import { regionsRouter } from "./modules/regions/regions.router";
import { shepherdsRouter } from "./modules/sheperds/shepherds.router";
import { startingZonesRouter } from "./modules/startingZones/startingZones.router";
import { teamsRouter } from "./modules/teams/teams.router";
import { usersRouter } from "./modules/users/users.router";
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
    teams: teamsRouter,
    matchPeriods: matchPeriodsRouter,
    matches: matchesRouter,
    devTools: devToolsRouter,
});

