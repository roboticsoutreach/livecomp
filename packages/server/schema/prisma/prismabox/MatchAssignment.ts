import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchAssignmentPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    matchId: t.String({ additionalProperties: false }),
    teamId: __nullable__(t.String({ additionalProperties: false })),
    startingZoneId: t.String({ additionalProperties: false }),
    gamePoints: __nullable__(t.Integer({ additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const MatchAssignmentRelations = t.Object(
  {
    match: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
        type: t.Union([t.Literal("LEAGUE"), t.Literal("KNOCKOUT")], {
          additionalProperties: false,
        }),
      },
      { additionalProperties: false },
    ),
    team: __nullable__(
      t.Object(
        {
          id: t.String({ additionalProperties: false }),
          createdAt: t.Date({ additionalProperties: false }),
          updatedAt: t.Date({ additionalProperties: false }),
          name: t.String({ additionalProperties: false }),
          shortName: t.String({ additionalProperties: false }),
          regionId: __nullable__(t.String({ additionalProperties: false })),
          competitionId: t.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
    autoAssignmentConfig: __nullable__(
      t.Object(
        {
          id: t.String({ additionalProperties: false }),
          createdAt: t.Date({ additionalProperties: false }),
          updatedAt: t.Date({ additionalProperties: false }),
          assignmentId: t.String({ additionalProperties: false }),
          targetMatchId: t.String({ additionalProperties: false }),
          position: t.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
    startingZone: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
        color: t.String({ additionalProperties: false }),
        gameId: t.String({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MatchAssignmentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        matchId: t.String(),
        teamId: t.String(),
        startingZoneId: t.String(),
        gamePoints: t.Integer(),
      }),
    { $id: "MatchAssignment" },
  ),
  { additionalProperties: false },
);

export const MatchAssignmentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(
        t.Object({
          id: t.String(),
          matchId_teamId: t.Object({ matchId: t.String(), teamId: t.String() }),
          matchId_startingZoneId: t.Object({
            matchId: t.String(),
            startingZoneId: t.String(),
          }),
        }),
      ),
      t.Union([
        t.Object({ id: t.String() }),
        t.Object({
          matchId_teamId: t.Object({ matchId: t.String(), teamId: t.String() }),
        }),
        t.Object({
          matchId_startingZoneId: t.Object({
            matchId: t.String(),
            startingZoneId: t.String(),
          }),
        }),
      ]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          {
            id: t.String(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
            matchId: t.String(),
            teamId: t.String(),
            startingZoneId: t.String(),
            gamePoints: t.Integer(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "MatchAssignment" },
);

export const MatchAssignmentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      matchId: t.Boolean(),
      match: t.Boolean(),
      teamId: t.Boolean(),
      team: t.Boolean(),
      autoAssignmentConfig: t.Boolean(),
      startingZoneId: t.Boolean(),
      startingZone: t.Boolean(),
      gamePoints: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchAssignmentInclude = t.Partial(
  t.Object(
    {
      match: t.Boolean(),
      team: t.Boolean(),
      autoAssignmentConfig: t.Boolean(),
      startingZone: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchAssignmentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      matchId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      teamId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      startingZoneId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      gamePoints: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchAssignment = t.Composite(
  [MatchAssignmentPlain, MatchAssignmentRelations],
  { additionalProperties: false },
);
