import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const AutoMatchAssignmentConfigPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    assignmentId: t.String({ additionalProperties: false }),
    targetMatchId: t.String({ additionalProperties: false }),
    position: t.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const AutoMatchAssignmentConfigRelations = t.Object(
  {
    assignment: t.Object(
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
    targetMatch: t.Object(
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

export const AutoMatchAssignmentConfigWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        assignmentId: t.String(),
        targetMatchId: t.String(),
        position: t.Integer(),
      }),
    { $id: "AutoMatchAssignmentConfig" },
  ),
  { additionalProperties: false },
);

export const AutoMatchAssignmentConfigWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String(), assignmentId: t.String() })),
      t.Union([
        t.Object({ id: t.String() }),
        t.Object({ assignmentId: t.String() }),
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
            assignmentId: t.String(),
            targetMatchId: t.String(),
            position: t.Integer(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "AutoMatchAssignmentConfig" },
);

export const AutoMatchAssignmentConfigSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      assignmentId: t.Boolean(),
      assignment: t.Boolean(),
      targetMatchId: t.Boolean(),
      targetMatch: t.Boolean(),
      position: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const AutoMatchAssignmentConfigInclude = t.Partial(
  t.Object(
    { assignment: t.Boolean(), targetMatch: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const AutoMatchAssignmentConfigOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      assignmentId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      targetMatchId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      position: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const AutoMatchAssignmentConfig = t.Composite(
  [AutoMatchAssignmentConfigPlain, AutoMatchAssignmentConfigRelations],
  { additionalProperties: false },
);
