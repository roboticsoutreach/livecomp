import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchPeriodPlain = t.Object(
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
);

export const MatchPeriodRelations = t.Object(
  {
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
  },
  { additionalProperties: false },
);

export const MatchPeriodWhere = t.Partial(
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
        status: t.Union(
          [
            t.Literal("NOT_STARTED"),
            t.Literal("IN_PROGRESS"),
            t.Literal("PAUSED"),
            t.Literal("FINISHED"),
          ],
          { additionalProperties: false },
        ),
        cursorPosition: t.Integer(),
        startsAt: t.Date(),
        competitionId: t.String(),
      }),
    { $id: "MatchPeriod" },
  ),
  { additionalProperties: false },
);

export const MatchPeriodWhereUnique = t.Recursive(
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
            status: t.Union(
              [
                t.Literal("NOT_STARTED"),
                t.Literal("IN_PROGRESS"),
                t.Literal("PAUSED"),
                t.Literal("FINISHED"),
              ],
              { additionalProperties: false },
            ),
            cursorPosition: t.Integer(),
            startsAt: t.Date(),
            competitionId: t.String(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "MatchPeriod" },
);

export const MatchPeriodSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      status: t.Boolean(),
      cursorPosition: t.Boolean(),
      startsAt: t.Boolean(),
      competitionId: t.Boolean(),
      competition: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchPeriodInclude = t.Partial(
  t.Object(
    { status: t.Boolean(), competition: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchPeriodOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      cursorPosition: t.Union([t.Literal("asc"), t.Literal("desc")]),
      startsAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      competitionId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const MatchPeriod = t.Composite(
  [MatchPeriodPlain, MatchPeriodRelations],
  { additionalProperties: false },
);
