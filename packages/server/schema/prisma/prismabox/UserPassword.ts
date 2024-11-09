import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const UserPasswordPlain = t.Object(
  {
    userId: t.String({ additionalProperties: false }),
    passwordHash: t.String({
      additionalProperties: false,
      description: `@omit`,
    }),
  },
  { additionalProperties: false },
);

export const UserPasswordRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String({ additionalProperties: false }),
        createdAt: t.Date({ additionalProperties: false }),
        updatedAt: t.Date({ additionalProperties: false }),
        name: t.String({ additionalProperties: false }),
        username: t.String({ additionalProperties: false }),
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

export const UserPasswordWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        userId: t.String(),
        passwordHash: t.String({ description: `@omit` }),
      }),
    { $id: "UserPassword" },
  ),
  { additionalProperties: false },
);

export const UserPasswordWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ userId: t.String() })),
      t.Union([t.Object({ userId: t.String() })]),
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
            userId: t.String(),
            passwordHash: t.String({ description: `@omit` }),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "UserPassword" },
);

export const UserPasswordSelect = t.Partial(
  t.Object(
    {
      userId: t.Boolean(),
      user: t.Boolean(),
      passwordHash: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const UserPasswordInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const UserPasswordOrderBy = t.Partial(
  t.Object(
    {
      userId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      passwordHash: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const UserPassword = t.Composite(
  [UserPasswordPlain, UserPasswordRelations],
  { additionalProperties: false },
);
