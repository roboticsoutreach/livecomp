import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ShepherdPlain = t.Object(
  {
    id: t.String({ additionalProperties: false }),
    createdAt: t.Date({ additionalProperties: false }),
    updatedAt: t.Date({ additionalProperties: false }),
    name: t.String({ additionalProperties: false }),
    color: t.String({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const ShepherdRelations = t.Object(
  {
    regions: t.Array(
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
  },
  { additionalProperties: false },
);

export const ShepherdWhere = t.Partial(
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
        color: t.String(),
      }),
    { $id: "Shepherd" },
  ),
  { additionalProperties: false },
);

export const ShepherdWhereUnique = t.Recursive(
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
            color: t.String(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    ]),
  { $id: "Shepherd" },
);

export const ShepherdSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      name: t.Boolean(),
      color: t.Boolean(),
      regions: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ShepherdInclude = t.Partial(
  t.Object(
    { regions: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ShepherdOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      color: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const Shepherd = t.Composite([ShepherdPlain, ShepherdRelations], {
  additionalProperties: false,
});
