import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const CompetitionPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    name: t.String({ additionalProperties: false }),
    shortName: t.String({ additionalProperties: false }),
    startsAt: t.Date({ additionalProperties: false }),
    endsAt: t.Date({ additionalProperties: false }),
    gameId: t.String({ additionalProperties: false }),
    venueId: t.String({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const CompetitionRelations = t.Object(
  {
    game: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
    venue: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
    teams: t.Array(
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
    matchPeriods: t.Array(
      t.Object(
        {
          id: t.String({ additionalProperties: false }),
          createdAt: t.Date({ additionalProperties: false }),
          updatedAt: t.Date({ additionalProperties: false }),
          name: t.String({ additionalProperties: false }),
          status: t.Union(
            [
              t.Literal("NOT_STARTED"),
              t.Literal("IN_PROGRESS"),
              t.Literal("PAUSED"),
              t.Literal("FINISHED"),
            ],
            { additionalProperties: false },
          ),
          cursorPosition: t.Integer({ additionalProperties: false }),
          startsAt: t.Date({ additionalProperties: false }),
          competitionId: t.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const CompetitionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        name: t.String(),
        shortName: t.String(),
        startsAt: t.Date(),
        endsAt: t.Date(),
        gameId: t.String(),
        venueId: t.String(),
      }),
    { $id: "Competition" },
  ),
  { additionalProperties: false },
);

export const CompetitionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String() })),
      t.Union([t.Object({ id: t.String() })]),
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
            name: t.String(),
            shortName: t.String(),
            startsAt: t.Date(),
            endsAt: t.Date(),
            gameId: t.String(),
            venueId: t.String(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "Competition" },
);

export const CompetitionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      shortName: t.Boolean(),
      startsAt: t.Boolean(),
      endsAt: t.Boolean(),
      gameId: t.Boolean(),
      game: t.Boolean(),
      venueId: t.Boolean(),
      venue: t.Boolean(),
      teams: t.Boolean(),
      matchPeriods: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const CompetitionInclude = t.Partial(
  t.Object(
    {
      game: t.Boolean(),
      venue: t.Boolean(),
      teams: t.Boolean(),
      matchPeriods: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const CompetitionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      shortName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      startsAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      endsAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      gameId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      venueId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const Competition = t.Composite(
  [CompetitionPlain, CompetitionRelations],
  { additionalProperties: false },
);
