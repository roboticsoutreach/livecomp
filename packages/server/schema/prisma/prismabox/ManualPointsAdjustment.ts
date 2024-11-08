import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ManualPointsAdjustmentPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    issuerId: t.String({ additionalProperties: false }),
    leaguePoints: t.Integer({ additionalProperties: false }),
    reason: t.String({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const ManualPointsAdjustmentRelations = t.Object(
  {
    issuer: t.Object(
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
  },
  { additionalProperties: false },
);

export const ManualPointsAdjustmentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        issuerId: t.String(),
        leaguePoints: t.Integer(),
        reason: t.String(),
      }),
    { $id: "ManualPointsAdjustment" },
  ),
  { additionalProperties: false },
);

export const ManualPointsAdjustmentWhereUnique = t.Recursive(
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
            issuerId: t.String(),
            leaguePoints: t.Integer(),
            reason: t.String(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "ManualPointsAdjustment" },
);

export const ManualPointsAdjustmentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      issuerId: t.Boolean(),
      issuer: t.Boolean(),
      leaguePoints: t.Boolean(),
      reason: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ManualPointsAdjustmentInclude = t.Partial(
  t.Object(
    { issuer: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ManualPointsAdjustmentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      issuerId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      leaguePoints: t.Union([t.Literal("asc"), t.Literal("desc")]),
      reason: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ManualPointsAdjustment = t.Composite(
  [ManualPointsAdjustmentPlain, ManualPointsAdjustmentRelations],
  { additionalProperties: false },
);
