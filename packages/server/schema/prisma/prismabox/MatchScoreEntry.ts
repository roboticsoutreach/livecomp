import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchScoreEntryPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    scorerId: t.String({ additionalProperties: false }),
    matchId: t.String({ additionalProperties: false }),
    scoreData: t.Any({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const MatchScoreEntryRelations = t.Object(
  {
    scorer: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
        email: t.String({ additionalProperties: false }),
        permissions: t.Array(
          t.Union([t.Literal("ManageCompetitions")], {
            additionalProperties: false,
          }),
        ),
        isRoot: t.Boolean({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
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
  },
  { additionalProperties: false },
);

export const MatchScoreEntryWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        scorerId: t.String(),
        matchId: t.String(),
        scoreData: t.Any(),
      }),
    { $id: "MatchScoreEntry" },
  ),
  { additionalProperties: false },
);

export const MatchScoreEntryWhereUnique = t.Recursive(
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
            scorerId: t.String(),
            matchId: t.String(),
            scoreData: t.Any(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "MatchScoreEntry" },
);

export const MatchScoreEntrySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      scorerId: t.Boolean(),
      scorer: t.Boolean(),
      matchId: t.Boolean(),
      match: t.Boolean(),
      scoreData: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchScoreEntryInclude = t.Partial(
  t.Object(
    { scorer: t.Boolean(), match: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchScoreEntryOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      scorerId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      matchId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      scoreData: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchScoreEntry = t.Composite(
  [MatchScoreEntryPlain, MatchScoreEntryRelations],
  { additionalProperties: false },
);
