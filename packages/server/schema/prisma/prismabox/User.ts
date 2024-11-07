import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
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
);

export const UserRelations = t.Object(
  {
    password: __nullable__(
      t.Object(
        {
          userId: t.String({ additionalProperties: false }),
          passwordHash: t.String({
            additionalProperties: false,
            description: `@omit`,
          }),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const UserWhere = t.Partial(
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
        email: t.String(),
        permissions: t.Array(
          t.Union([t.Literal("ManageCompetitions")], {
            additionalProperties: false,
          }),
        ),
        isRoot: t.Boolean(),
      }),
    { $id: "User" },
  ),
  { additionalProperties: false },
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String(), email: t.String() })),
      t.Union([t.Object({ id: t.String() }), t.Object({ email: t.String() })]),
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
            email: t.String(),
            permissions: t.Array(
              t.Union([t.Literal("ManageCompetitions")], {
                additionalProperties: false,
              }),
            ),
            isRoot: t.Boolean(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      permissions: t.Boolean(),
      isRoot: t.Boolean(),
      password: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const UserInclude = t.Partial(
  t.Object(
    { permissions: t.Boolean(), password: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const UserOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      email: t.Union([t.Literal("asc"), t.Literal("desc")]),
      isRoot: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const User = t.Composite([UserPlain, UserRelations], {
  additionalProperties: false,
});
