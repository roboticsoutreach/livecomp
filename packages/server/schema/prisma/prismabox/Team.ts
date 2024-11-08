import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const TeamPlain = t.Object(
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
);

export const TeamRelations = t.Object(
  {
    region: __nullable__(
      t.Object(
        {
          id: t.String({ additionalProperties: false }),
          createdAt: t.Date({ additionalProperties: false }),
          updatedAt: t.Date({ additionalProperties: false }),
          name: t.String({ additionalProperties: false }),
          venueId: t.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
    competition: t.Object(
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
    ),
    matchAssignments: t.Array(
      t.Object(
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
      ),
    ),
  },
  { additionalProperties: false },
);

export const TeamWhere = t.Partial(
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
        regionId: t.String(),
        competitionId: t.String(),
      }),
    { $id: "Team" },
  ),
  { additionalProperties: false },
);

export const TeamWhereUnique = t.Recursive(
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
            regionId: t.String(),
            competitionId: t.String(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "Team" },
);

export const TeamSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      shortName: t.Boolean(),
      regionId: t.Boolean(),
      region: t.Boolean(),
      competitionId: t.Boolean(),
      competition: t.Boolean(),
      matchAssignments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const TeamInclude = t.Partial(
  t.Object(
    {
      region: t.Boolean(),
      competition: t.Boolean(),
      matchAssignments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const TeamOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      shortName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      regionId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      competitionId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const Team = t.Composite([TeamPlain, TeamRelations], {
  additionalProperties: false,
});
