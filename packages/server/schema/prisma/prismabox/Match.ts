import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchPlain = t.Object(
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
);

export const MatchRelations = t.Object(
  {
    scoreEntries: t.Array(
      t.Object(
        {
          id: t.String({ additionalProperties: false }),
          createdAt: t.Date({ additionalProperties: false }),
          updatedAt: t.Date({ additionalProperties: false }),
          scorerId: t.String({ additionalProperties: false }),
          matchId: t.String({ additionalProperties: false }),
          scoreData: t.Any({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
    assignments: t.Array(
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
    autoAssignmentConfigDependants: t.Array(
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
  },
  { additionalProperties: false },
);

export const MatchWhere = t.Partial(
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
        type: t.Union([t.Literal("LEAGUE"), t.Literal("KNOCKOUT")], {
          additionalProperties: false,
        }),
      }),
    { $id: "Match" },
  ),
  { additionalProperties: false },
);

export const MatchWhereUnique = t.Recursive(
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
            type: t.Union([t.Literal("LEAGUE"), t.Literal("KNOCKOUT")], {
              additionalProperties: false,
            }),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "Match" },
);

export const MatchSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      type: t.Boolean(),
      scoreEntries: t.Boolean(),
      assignments: t.Boolean(),
      autoAssignmentConfigDependants: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchInclude = t.Partial(
  t.Object(
    {
      type: t.Boolean(),
      scoreEntries: t.Boolean(),
      assignments: t.Boolean(),
      autoAssignmentConfigDependants: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const Match = t.Composite([MatchPlain, MatchRelations], {
  additionalProperties: false,
});
