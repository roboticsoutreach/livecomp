/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as DisplayImport } from "./routes/display";
import { Route as ConsoleImport } from "./routes/console";
import { Route as IndexImport } from "./routes/index";
import { Route as DisplayIndexImport } from "./routes/display/index";
import { Route as DisplayScoresImport } from "./routes/display/scores";
import { Route as DisplayNextMatchesImport } from "./routes/display/next-matches";
import { Route as DisplayArenaImport } from "./routes/display/arena";
import { Route as ConsoleVenuesImport } from "./routes/console/venues";
import { Route as ConsoleUsersImport } from "./routes/console/users";
import { Route as ConsoleGamesImport } from "./routes/console/games";
import { Route as ConsoleDashboardImport } from "./routes/console/dashboard";
import { Route as ConsoleCompetitionsImport } from "./routes/console/competitions";
import { Route as ConsoleChangePasswordImport } from "./routes/console/changePassword";
import { Route as AuthLoginImport } from "./routes/auth/login";
import { Route as ConsoleVenuesIndexImport } from "./routes/console/venues.index";
import { Route as ConsoleUsersIndexImport } from "./routes/console/users.index";
import { Route as ConsoleGamesIndexImport } from "./routes/console/games.index";
import { Route as ConsoleCompetitionsIndexImport } from "./routes/console/competitions.index";
import { Route as DisplayCompetitionIdLeaderboardImport } from "./routes/display/$competitionId/leaderboard";
import { Route as DisplayCompetitionIdArenaImport } from "./routes/display/$competitionId/arena";
import { Route as ConsoleVenuesVenueIdImport } from "./routes/console/venues.$venueId";
import { Route as ConsoleUsersUserIdImport } from "./routes/console/users.$userId";
import { Route as ConsoleGamesGameIdImport } from "./routes/console/games.$gameId";
import { Route as ConsoleCompetitionsCompetitionIdImport } from "./routes/console/competitions.$competitionId";
import { Route as ConsoleCompetitionsCompetitionIdIndexImport } from "./routes/console/competitions.$competitionId/index";
import { Route as ConsoleCompetitionsCompetitionIdTeamsTeamIdImport } from "./routes/console/competitions.$competitionId/teams.$teamId";
import { Route as ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexImport } from "./routes/console/competitions.$competitionId/matchPeriods.$matchPeriodId/index";
import { Route as ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdImport } from "./routes/console/competitions.$competitionId/matchPeriods.$matchPeriodId/matches.$matchId";

// Create/Update Routes

const DisplayRoute = DisplayImport.update({
  id: "/display",
  path: "/display",
  getParentRoute: () => rootRoute,
} as any);

const ConsoleRoute = ConsoleImport.update({
  id: "/console",
  path: "/console",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const DisplayIndexRoute = DisplayIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => DisplayRoute,
} as any);

const DisplayScoresRoute = DisplayScoresImport.update({
  id: "/scores",
  path: "/scores",
  getParentRoute: () => DisplayRoute,
} as any);

const DisplayNextMatchesRoute = DisplayNextMatchesImport.update({
  id: "/next-matches",
  path: "/next-matches",
  getParentRoute: () => DisplayRoute,
} as any);

const DisplayArenaRoute = DisplayArenaImport.update({
  id: "/arena",
  path: "/arena",
  getParentRoute: () => DisplayRoute,
} as any);

const ConsoleVenuesRoute = ConsoleVenuesImport.update({
  id: "/venues",
  path: "/venues",
  getParentRoute: () => ConsoleRoute,
} as any);

const ConsoleUsersRoute = ConsoleUsersImport.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => ConsoleRoute,
} as any);

const ConsoleGamesRoute = ConsoleGamesImport.update({
  id: "/games",
  path: "/games",
  getParentRoute: () => ConsoleRoute,
} as any);

const ConsoleDashboardRoute = ConsoleDashboardImport.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => ConsoleRoute,
} as any);

const ConsoleCompetitionsRoute = ConsoleCompetitionsImport.update({
  id: "/competitions",
  path: "/competitions",
  getParentRoute: () => ConsoleRoute,
} as any);

const ConsoleChangePasswordRoute = ConsoleChangePasswordImport.update({
  id: "/changePassword",
  path: "/changePassword",
  getParentRoute: () => ConsoleRoute,
} as any);

const AuthLoginRoute = AuthLoginImport.update({
  id: "/auth/login",
  path: "/auth/login",
  getParentRoute: () => rootRoute,
} as any);

const ConsoleVenuesIndexRoute = ConsoleVenuesIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => ConsoleVenuesRoute,
} as any);

const ConsoleUsersIndexRoute = ConsoleUsersIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => ConsoleUsersRoute,
} as any);

const ConsoleGamesIndexRoute = ConsoleGamesIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => ConsoleGamesRoute,
} as any);

const ConsoleCompetitionsIndexRoute = ConsoleCompetitionsIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => ConsoleCompetitionsRoute,
} as any);

const DisplayCompetitionIdLeaderboardRoute =
  DisplayCompetitionIdLeaderboardImport.update({
    id: "/$competitionId/leaderboard",
    path: "/$competitionId/leaderboard",
    getParentRoute: () => DisplayRoute,
  } as any);

const DisplayCompetitionIdArenaRoute = DisplayCompetitionIdArenaImport.update({
  id: "/$competitionId/arena",
  path: "/$competitionId/arena",
  getParentRoute: () => DisplayRoute,
} as any);

const ConsoleVenuesVenueIdRoute = ConsoleVenuesVenueIdImport.update({
  id: "/$venueId",
  path: "/$venueId",
  getParentRoute: () => ConsoleVenuesRoute,
} as any);

const ConsoleUsersUserIdRoute = ConsoleUsersUserIdImport.update({
  id: "/$userId",
  path: "/$userId",
  getParentRoute: () => ConsoleUsersRoute,
} as any);

const ConsoleGamesGameIdRoute = ConsoleGamesGameIdImport.update({
  id: "/$gameId",
  path: "/$gameId",
  getParentRoute: () => ConsoleGamesRoute,
} as any);

const ConsoleCompetitionsCompetitionIdRoute =
  ConsoleCompetitionsCompetitionIdImport.update({
    id: "/$competitionId",
    path: "/$competitionId",
    getParentRoute: () => ConsoleCompetitionsRoute,
  } as any);

const ConsoleCompetitionsCompetitionIdIndexRoute =
  ConsoleCompetitionsCompetitionIdIndexImport.update({
    id: "/",
    path: "/",
    getParentRoute: () => ConsoleCompetitionsCompetitionIdRoute,
  } as any);

const ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute =
  ConsoleCompetitionsCompetitionIdTeamsTeamIdImport.update({
    id: "/teams/$teamId",
    path: "/teams/$teamId",
    getParentRoute: () => ConsoleCompetitionsCompetitionIdRoute,
  } as any);

const ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute =
  ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexImport.update({
    id: "/matchPeriods/$matchPeriodId/",
    path: "/matchPeriods/$matchPeriodId/",
    getParentRoute: () => ConsoleCompetitionsCompetitionIdRoute,
  } as any);

const ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute =
  ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdImport.update(
    {
      id: "/matchPeriods/$matchPeriodId/matches/$matchId",
      path: "/matchPeriods/$matchPeriodId/matches/$matchId",
      getParentRoute: () => ConsoleCompetitionsCompetitionIdRoute,
    } as any,
  );

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/console": {
      id: "/console";
      path: "/console";
      fullPath: "/console";
      preLoaderRoute: typeof ConsoleImport;
      parentRoute: typeof rootRoute;
    };
    "/display": {
      id: "/display";
      path: "/display";
      fullPath: "/display";
      preLoaderRoute: typeof DisplayImport;
      parentRoute: typeof rootRoute;
    };
    "/auth/login": {
      id: "/auth/login";
      path: "/auth/login";
      fullPath: "/auth/login";
      preLoaderRoute: typeof AuthLoginImport;
      parentRoute: typeof rootRoute;
    };
    "/console/changePassword": {
      id: "/console/changePassword";
      path: "/changePassword";
      fullPath: "/console/changePassword";
      preLoaderRoute: typeof ConsoleChangePasswordImport;
      parentRoute: typeof ConsoleImport;
    };
    "/console/competitions": {
      id: "/console/competitions";
      path: "/competitions";
      fullPath: "/console/competitions";
      preLoaderRoute: typeof ConsoleCompetitionsImport;
      parentRoute: typeof ConsoleImport;
    };
    "/console/dashboard": {
      id: "/console/dashboard";
      path: "/dashboard";
      fullPath: "/console/dashboard";
      preLoaderRoute: typeof ConsoleDashboardImport;
      parentRoute: typeof ConsoleImport;
    };
    "/console/games": {
      id: "/console/games";
      path: "/games";
      fullPath: "/console/games";
      preLoaderRoute: typeof ConsoleGamesImport;
      parentRoute: typeof ConsoleImport;
    };
    "/console/users": {
      id: "/console/users";
      path: "/users";
      fullPath: "/console/users";
      preLoaderRoute: typeof ConsoleUsersImport;
      parentRoute: typeof ConsoleImport;
    };
    "/console/venues": {
      id: "/console/venues";
      path: "/venues";
      fullPath: "/console/venues";
      preLoaderRoute: typeof ConsoleVenuesImport;
      parentRoute: typeof ConsoleImport;
    };
    "/display/arena": {
      id: "/display/arena";
      path: "/arena";
      fullPath: "/display/arena";
      preLoaderRoute: typeof DisplayArenaImport;
      parentRoute: typeof DisplayImport;
    };
    "/display/next-matches": {
      id: "/display/next-matches";
      path: "/next-matches";
      fullPath: "/display/next-matches";
      preLoaderRoute: typeof DisplayNextMatchesImport;
      parentRoute: typeof DisplayImport;
    };
    "/display/scores": {
      id: "/display/scores";
      path: "/scores";
      fullPath: "/display/scores";
      preLoaderRoute: typeof DisplayScoresImport;
      parentRoute: typeof DisplayImport;
    };
    "/display/": {
      id: "/display/";
      path: "/";
      fullPath: "/display/";
      preLoaderRoute: typeof DisplayIndexImport;
      parentRoute: typeof DisplayImport;
    };
    "/console/competitions/$competitionId": {
      id: "/console/competitions/$competitionId";
      path: "/$competitionId";
      fullPath: "/console/competitions/$competitionId";
      preLoaderRoute: typeof ConsoleCompetitionsCompetitionIdImport;
      parentRoute: typeof ConsoleCompetitionsImport;
    };
    "/console/games/$gameId": {
      id: "/console/games/$gameId";
      path: "/$gameId";
      fullPath: "/console/games/$gameId";
      preLoaderRoute: typeof ConsoleGamesGameIdImport;
      parentRoute: typeof ConsoleGamesImport;
    };
    "/console/users/$userId": {
      id: "/console/users/$userId";
      path: "/$userId";
      fullPath: "/console/users/$userId";
      preLoaderRoute: typeof ConsoleUsersUserIdImport;
      parentRoute: typeof ConsoleUsersImport;
    };
    "/console/venues/$venueId": {
      id: "/console/venues/$venueId";
      path: "/$venueId";
      fullPath: "/console/venues/$venueId";
      preLoaderRoute: typeof ConsoleVenuesVenueIdImport;
      parentRoute: typeof ConsoleVenuesImport;
    };
    "/display/$competitionId/arena": {
      id: "/display/$competitionId/arena";
      path: "/$competitionId/arena";
      fullPath: "/display/$competitionId/arena";
      preLoaderRoute: typeof DisplayCompetitionIdArenaImport;
      parentRoute: typeof DisplayImport;
    };
    "/display/$competitionId/leaderboard": {
      id: "/display/$competitionId/leaderboard";
      path: "/$competitionId/leaderboard";
      fullPath: "/display/$competitionId/leaderboard";
      preLoaderRoute: typeof DisplayCompetitionIdLeaderboardImport;
      parentRoute: typeof DisplayImport;
    };
    "/console/competitions/": {
      id: "/console/competitions/";
      path: "/";
      fullPath: "/console/competitions/";
      preLoaderRoute: typeof ConsoleCompetitionsIndexImport;
      parentRoute: typeof ConsoleCompetitionsImport;
    };
    "/console/games/": {
      id: "/console/games/";
      path: "/";
      fullPath: "/console/games/";
      preLoaderRoute: typeof ConsoleGamesIndexImport;
      parentRoute: typeof ConsoleGamesImport;
    };
    "/console/users/": {
      id: "/console/users/";
      path: "/";
      fullPath: "/console/users/";
      preLoaderRoute: typeof ConsoleUsersIndexImport;
      parentRoute: typeof ConsoleUsersImport;
    };
    "/console/venues/": {
      id: "/console/venues/";
      path: "/";
      fullPath: "/console/venues/";
      preLoaderRoute: typeof ConsoleVenuesIndexImport;
      parentRoute: typeof ConsoleVenuesImport;
    };
    "/console/competitions/$competitionId/": {
      id: "/console/competitions/$competitionId/";
      path: "/";
      fullPath: "/console/competitions/$competitionId/";
      preLoaderRoute: typeof ConsoleCompetitionsCompetitionIdIndexImport;
      parentRoute: typeof ConsoleCompetitionsCompetitionIdImport;
    };
    "/console/competitions/$competitionId/teams/$teamId": {
      id: "/console/competitions/$competitionId/teams/$teamId";
      path: "/teams/$teamId";
      fullPath: "/console/competitions/$competitionId/teams/$teamId";
      preLoaderRoute: typeof ConsoleCompetitionsCompetitionIdTeamsTeamIdImport;
      parentRoute: typeof ConsoleCompetitionsCompetitionIdImport;
    };
    "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/": {
      id: "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/";
      path: "/matchPeriods/$matchPeriodId";
      fullPath: "/console/competitions/$competitionId/matchPeriods/$matchPeriodId";
      preLoaderRoute: typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexImport;
      parentRoute: typeof ConsoleCompetitionsCompetitionIdImport;
    };
    "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId": {
      id: "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId";
      path: "/matchPeriods/$matchPeriodId/matches/$matchId";
      fullPath: "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId";
      preLoaderRoute: typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdImport;
      parentRoute: typeof ConsoleCompetitionsCompetitionIdImport;
    };
  }
}

// Create and export the route tree

interface ConsoleCompetitionsCompetitionIdRouteChildren {
  ConsoleCompetitionsCompetitionIdIndexRoute: typeof ConsoleCompetitionsCompetitionIdIndexRoute;
  ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute: typeof ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute;
  ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute: typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute;
  ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute: typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute;
}

const ConsoleCompetitionsCompetitionIdRouteChildren: ConsoleCompetitionsCompetitionIdRouteChildren =
  {
    ConsoleCompetitionsCompetitionIdIndexRoute:
      ConsoleCompetitionsCompetitionIdIndexRoute,
    ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute:
      ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute,
    ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute:
      ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute,
    ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute:
      ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute,
  };

const ConsoleCompetitionsCompetitionIdRouteWithChildren =
  ConsoleCompetitionsCompetitionIdRoute._addFileChildren(
    ConsoleCompetitionsCompetitionIdRouteChildren,
  );

interface ConsoleCompetitionsRouteChildren {
  ConsoleCompetitionsCompetitionIdRoute: typeof ConsoleCompetitionsCompetitionIdRouteWithChildren;
  ConsoleCompetitionsIndexRoute: typeof ConsoleCompetitionsIndexRoute;
}

const ConsoleCompetitionsRouteChildren: ConsoleCompetitionsRouteChildren = {
  ConsoleCompetitionsCompetitionIdRoute:
    ConsoleCompetitionsCompetitionIdRouteWithChildren,
  ConsoleCompetitionsIndexRoute: ConsoleCompetitionsIndexRoute,
};

const ConsoleCompetitionsRouteWithChildren =
  ConsoleCompetitionsRoute._addFileChildren(ConsoleCompetitionsRouteChildren);

interface ConsoleGamesRouteChildren {
  ConsoleGamesGameIdRoute: typeof ConsoleGamesGameIdRoute;
  ConsoleGamesIndexRoute: typeof ConsoleGamesIndexRoute;
}

const ConsoleGamesRouteChildren: ConsoleGamesRouteChildren = {
  ConsoleGamesGameIdRoute: ConsoleGamesGameIdRoute,
  ConsoleGamesIndexRoute: ConsoleGamesIndexRoute,
};

const ConsoleGamesRouteWithChildren = ConsoleGamesRoute._addFileChildren(
  ConsoleGamesRouteChildren,
);

interface ConsoleUsersRouteChildren {
  ConsoleUsersUserIdRoute: typeof ConsoleUsersUserIdRoute;
  ConsoleUsersIndexRoute: typeof ConsoleUsersIndexRoute;
}

const ConsoleUsersRouteChildren: ConsoleUsersRouteChildren = {
  ConsoleUsersUserIdRoute: ConsoleUsersUserIdRoute,
  ConsoleUsersIndexRoute: ConsoleUsersIndexRoute,
};

const ConsoleUsersRouteWithChildren = ConsoleUsersRoute._addFileChildren(
  ConsoleUsersRouteChildren,
);

interface ConsoleVenuesRouteChildren {
  ConsoleVenuesVenueIdRoute: typeof ConsoleVenuesVenueIdRoute;
  ConsoleVenuesIndexRoute: typeof ConsoleVenuesIndexRoute;
}

const ConsoleVenuesRouteChildren: ConsoleVenuesRouteChildren = {
  ConsoleVenuesVenueIdRoute: ConsoleVenuesVenueIdRoute,
  ConsoleVenuesIndexRoute: ConsoleVenuesIndexRoute,
};

const ConsoleVenuesRouteWithChildren = ConsoleVenuesRoute._addFileChildren(
  ConsoleVenuesRouteChildren,
);

interface ConsoleRouteChildren {
  ConsoleChangePasswordRoute: typeof ConsoleChangePasswordRoute;
  ConsoleCompetitionsRoute: typeof ConsoleCompetitionsRouteWithChildren;
  ConsoleDashboardRoute: typeof ConsoleDashboardRoute;
  ConsoleGamesRoute: typeof ConsoleGamesRouteWithChildren;
  ConsoleUsersRoute: typeof ConsoleUsersRouteWithChildren;
  ConsoleVenuesRoute: typeof ConsoleVenuesRouteWithChildren;
}

const ConsoleRouteChildren: ConsoleRouteChildren = {
  ConsoleChangePasswordRoute: ConsoleChangePasswordRoute,
  ConsoleCompetitionsRoute: ConsoleCompetitionsRouteWithChildren,
  ConsoleDashboardRoute: ConsoleDashboardRoute,
  ConsoleGamesRoute: ConsoleGamesRouteWithChildren,
  ConsoleUsersRoute: ConsoleUsersRouteWithChildren,
  ConsoleVenuesRoute: ConsoleVenuesRouteWithChildren,
};

const ConsoleRouteWithChildren =
  ConsoleRoute._addFileChildren(ConsoleRouteChildren);

interface DisplayRouteChildren {
  DisplayArenaRoute: typeof DisplayArenaRoute;
  DisplayNextMatchesRoute: typeof DisplayNextMatchesRoute;
  DisplayScoresRoute: typeof DisplayScoresRoute;
  DisplayIndexRoute: typeof DisplayIndexRoute;
  DisplayCompetitionIdArenaRoute: typeof DisplayCompetitionIdArenaRoute;
  DisplayCompetitionIdLeaderboardRoute: typeof DisplayCompetitionIdLeaderboardRoute;
}

const DisplayRouteChildren: DisplayRouteChildren = {
  DisplayArenaRoute: DisplayArenaRoute,
  DisplayNextMatchesRoute: DisplayNextMatchesRoute,
  DisplayScoresRoute: DisplayScoresRoute,
  DisplayIndexRoute: DisplayIndexRoute,
  DisplayCompetitionIdArenaRoute: DisplayCompetitionIdArenaRoute,
  DisplayCompetitionIdLeaderboardRoute: DisplayCompetitionIdLeaderboardRoute,
};

const DisplayRouteWithChildren =
  DisplayRoute._addFileChildren(DisplayRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/console": typeof ConsoleRouteWithChildren;
  "/display": typeof DisplayRouteWithChildren;
  "/auth/login": typeof AuthLoginRoute;
  "/console/changePassword": typeof ConsoleChangePasswordRoute;
  "/console/competitions": typeof ConsoleCompetitionsRouteWithChildren;
  "/console/dashboard": typeof ConsoleDashboardRoute;
  "/console/games": typeof ConsoleGamesRouteWithChildren;
  "/console/users": typeof ConsoleUsersRouteWithChildren;
  "/console/venues": typeof ConsoleVenuesRouteWithChildren;
  "/display/arena": typeof DisplayArenaRoute;
  "/display/next-matches": typeof DisplayNextMatchesRoute;
  "/display/scores": typeof DisplayScoresRoute;
  "/display/": typeof DisplayIndexRoute;
  "/console/competitions/$competitionId": typeof ConsoleCompetitionsCompetitionIdRouteWithChildren;
  "/console/games/$gameId": typeof ConsoleGamesGameIdRoute;
  "/console/users/$userId": typeof ConsoleUsersUserIdRoute;
  "/console/venues/$venueId": typeof ConsoleVenuesVenueIdRoute;
  "/display/$competitionId/arena": typeof DisplayCompetitionIdArenaRoute;
  "/display/$competitionId/leaderboard": typeof DisplayCompetitionIdLeaderboardRoute;
  "/console/competitions/": typeof ConsoleCompetitionsIndexRoute;
  "/console/games/": typeof ConsoleGamesIndexRoute;
  "/console/users/": typeof ConsoleUsersIndexRoute;
  "/console/venues/": typeof ConsoleVenuesIndexRoute;
  "/console/competitions/$competitionId/": typeof ConsoleCompetitionsCompetitionIdIndexRoute;
  "/console/competitions/$competitionId/teams/$teamId": typeof ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/console": typeof ConsoleRouteWithChildren;
  "/auth/login": typeof AuthLoginRoute;
  "/console/changePassword": typeof ConsoleChangePasswordRoute;
  "/console/dashboard": typeof ConsoleDashboardRoute;
  "/display/arena": typeof DisplayArenaRoute;
  "/display/next-matches": typeof DisplayNextMatchesRoute;
  "/display/scores": typeof DisplayScoresRoute;
  "/display": typeof DisplayIndexRoute;
  "/console/games/$gameId": typeof ConsoleGamesGameIdRoute;
  "/console/users/$userId": typeof ConsoleUsersUserIdRoute;
  "/console/venues/$venueId": typeof ConsoleVenuesVenueIdRoute;
  "/display/$competitionId/arena": typeof DisplayCompetitionIdArenaRoute;
  "/display/$competitionId/leaderboard": typeof DisplayCompetitionIdLeaderboardRoute;
  "/console/competitions": typeof ConsoleCompetitionsIndexRoute;
  "/console/games": typeof ConsoleGamesIndexRoute;
  "/console/users": typeof ConsoleUsersIndexRoute;
  "/console/venues": typeof ConsoleVenuesIndexRoute;
  "/console/competitions/$competitionId": typeof ConsoleCompetitionsCompetitionIdIndexRoute;
  "/console/competitions/$competitionId/teams/$teamId": typeof ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/console": typeof ConsoleRouteWithChildren;
  "/display": typeof DisplayRouteWithChildren;
  "/auth/login": typeof AuthLoginRoute;
  "/console/changePassword": typeof ConsoleChangePasswordRoute;
  "/console/competitions": typeof ConsoleCompetitionsRouteWithChildren;
  "/console/dashboard": typeof ConsoleDashboardRoute;
  "/console/games": typeof ConsoleGamesRouteWithChildren;
  "/console/users": typeof ConsoleUsersRouteWithChildren;
  "/console/venues": typeof ConsoleVenuesRouteWithChildren;
  "/display/arena": typeof DisplayArenaRoute;
  "/display/next-matches": typeof DisplayNextMatchesRoute;
  "/display/scores": typeof DisplayScoresRoute;
  "/display/": typeof DisplayIndexRoute;
  "/console/competitions/$competitionId": typeof ConsoleCompetitionsCompetitionIdRouteWithChildren;
  "/console/games/$gameId": typeof ConsoleGamesGameIdRoute;
  "/console/users/$userId": typeof ConsoleUsersUserIdRoute;
  "/console/venues/$venueId": typeof ConsoleVenuesVenueIdRoute;
  "/display/$competitionId/arena": typeof DisplayCompetitionIdArenaRoute;
  "/display/$competitionId/leaderboard": typeof DisplayCompetitionIdLeaderboardRoute;
  "/console/competitions/": typeof ConsoleCompetitionsIndexRoute;
  "/console/games/": typeof ConsoleGamesIndexRoute;
  "/console/users/": typeof ConsoleUsersIndexRoute;
  "/console/venues/": typeof ConsoleVenuesIndexRoute;
  "/console/competitions/$competitionId/": typeof ConsoleCompetitionsCompetitionIdIndexRoute;
  "/console/competitions/$competitionId/teams/$teamId": typeof ConsoleCompetitionsCompetitionIdTeamsTeamIdRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdIndexRoute;
  "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId": typeof ConsoleCompetitionsCompetitionIdMatchPeriodsMatchPeriodIdMatchesMatchIdRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/console"
    | "/display"
    | "/auth/login"
    | "/console/changePassword"
    | "/console/competitions"
    | "/console/dashboard"
    | "/console/games"
    | "/console/users"
    | "/console/venues"
    | "/display/arena"
    | "/display/next-matches"
    | "/display/scores"
    | "/display/"
    | "/console/competitions/$competitionId"
    | "/console/games/$gameId"
    | "/console/users/$userId"
    | "/console/venues/$venueId"
    | "/display/$competitionId/arena"
    | "/display/$competitionId/leaderboard"
    | "/console/competitions/"
    | "/console/games/"
    | "/console/users/"
    | "/console/venues/"
    | "/console/competitions/$competitionId/"
    | "/console/competitions/$competitionId/teams/$teamId"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/console"
    | "/auth/login"
    | "/console/changePassword"
    | "/console/dashboard"
    | "/display/arena"
    | "/display/next-matches"
    | "/display/scores"
    | "/display"
    | "/console/games/$gameId"
    | "/console/users/$userId"
    | "/console/venues/$venueId"
    | "/display/$competitionId/arena"
    | "/display/$competitionId/leaderboard"
    | "/console/competitions"
    | "/console/games"
    | "/console/users"
    | "/console/venues"
    | "/console/competitions/$competitionId"
    | "/console/competitions/$competitionId/teams/$teamId"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId";
  id:
    | "__root__"
    | "/"
    | "/console"
    | "/display"
    | "/auth/login"
    | "/console/changePassword"
    | "/console/competitions"
    | "/console/dashboard"
    | "/console/games"
    | "/console/users"
    | "/console/venues"
    | "/display/arena"
    | "/display/next-matches"
    | "/display/scores"
    | "/display/"
    | "/console/competitions/$competitionId"
    | "/console/games/$gameId"
    | "/console/users/$userId"
    | "/console/venues/$venueId"
    | "/display/$competitionId/arena"
    | "/display/$competitionId/leaderboard"
    | "/console/competitions/"
    | "/console/games/"
    | "/console/users/"
    | "/console/venues/"
    | "/console/competitions/$competitionId/"
    | "/console/competitions/$competitionId/teams/$teamId"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/"
    | "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  ConsoleRoute: typeof ConsoleRouteWithChildren;
  DisplayRoute: typeof DisplayRouteWithChildren;
  AuthLoginRoute: typeof AuthLoginRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ConsoleRoute: ConsoleRouteWithChildren,
  DisplayRoute: DisplayRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/console",
        "/display",
        "/auth/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/console": {
      "filePath": "console.tsx",
      "children": [
        "/console/changePassword",
        "/console/competitions",
        "/console/dashboard",
        "/console/games",
        "/console/users",
        "/console/venues"
      ]
    },
    "/display": {
      "filePath": "display.tsx",
      "children": [
        "/display/arena",
        "/display/next-matches",
        "/display/scores",
        "/display/",
        "/display/$competitionId/arena",
        "/display/$competitionId/leaderboard"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/console/changePassword": {
      "filePath": "console/changePassword.tsx",
      "parent": "/console"
    },
    "/console/competitions": {
      "filePath": "console/competitions.tsx",
      "parent": "/console",
      "children": [
        "/console/competitions/$competitionId",
        "/console/competitions/"
      ]
    },
    "/console/dashboard": {
      "filePath": "console/dashboard.tsx",
      "parent": "/console"
    },
    "/console/games": {
      "filePath": "console/games.tsx",
      "parent": "/console",
      "children": [
        "/console/games/$gameId",
        "/console/games/"
      ]
    },
    "/console/users": {
      "filePath": "console/users.tsx",
      "parent": "/console",
      "children": [
        "/console/users/$userId",
        "/console/users/"
      ]
    },
    "/console/venues": {
      "filePath": "console/venues.tsx",
      "parent": "/console",
      "children": [
        "/console/venues/$venueId",
        "/console/venues/"
      ]
    },
    "/display/arena": {
      "filePath": "display/arena.tsx",
      "parent": "/display"
    },
    "/display/next-matches": {
      "filePath": "display/next-matches.tsx",
      "parent": "/display"
    },
    "/display/scores": {
      "filePath": "display/scores.tsx",
      "parent": "/display"
    },
    "/display/": {
      "filePath": "display/index.tsx",
      "parent": "/display"
    },
    "/console/competitions/$competitionId": {
      "filePath": "console/competitions.$competitionId.tsx",
      "parent": "/console/competitions",
      "children": [
        "/console/competitions/$competitionId/",
        "/console/competitions/$competitionId/teams/$teamId",
        "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/",
        "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId"
      ]
    },
    "/console/games/$gameId": {
      "filePath": "console/games.$gameId.tsx",
      "parent": "/console/games"
    },
    "/console/users/$userId": {
      "filePath": "console/users.$userId.tsx",
      "parent": "/console/users"
    },
    "/console/venues/$venueId": {
      "filePath": "console/venues.$venueId.tsx",
      "parent": "/console/venues"
    },
    "/display/$competitionId/arena": {
      "filePath": "display/$competitionId/arena.tsx",
      "parent": "/display"
    },
    "/display/$competitionId/leaderboard": {
      "filePath": "display/$competitionId/leaderboard.tsx",
      "parent": "/display"
    },
    "/console/competitions/": {
      "filePath": "console/competitions.index.tsx",
      "parent": "/console/competitions"
    },
    "/console/games/": {
      "filePath": "console/games.index.tsx",
      "parent": "/console/games"
    },
    "/console/users/": {
      "filePath": "console/users.index.tsx",
      "parent": "/console/users"
    },
    "/console/venues/": {
      "filePath": "console/venues.index.tsx",
      "parent": "/console/venues"
    },
    "/console/competitions/$competitionId/": {
      "filePath": "console/competitions.$competitionId/index.tsx",
      "parent": "/console/competitions/$competitionId"
    },
    "/console/competitions/$competitionId/teams/$teamId": {
      "filePath": "console/competitions.$competitionId/teams.$teamId.tsx",
      "parent": "/console/competitions/$competitionId"
    },
    "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/": {
      "filePath": "console/competitions.$competitionId/matchPeriods.$matchPeriodId/index.tsx",
      "parent": "/console/competitions/$competitionId"
    },
    "/console/competitions/$competitionId/matchPeriods/$matchPeriodId/matches/$matchId": {
      "filePath": "console/competitions.$competitionId/matchPeriods.$matchPeriodId/matches.$matchId.tsx",
      "parent": "/console/competitions/$competitionId"
    }
  }
}
ROUTE_MANIFEST_END */
