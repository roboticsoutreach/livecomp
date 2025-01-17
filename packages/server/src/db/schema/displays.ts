import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { competitions } from "./competitions";

export const displays = pgTable(
    "displays",
    {
        ...baseColumns,

        name: varchar().notNull(),
        competitionId: uuid()
            .references(() => competitions.id)
            .notNull(),
        identifier: varchar().notNull(),
        description: varchar().notNull(),
        route: varchar().notNull(),
    },
    (displays) => ({
        uniqueIdentifier: unique("unique_display_identifier").on(displays.identifier, displays.competitionId),
    })
);

export const displaysRelations = relations(displays, ({ one }) => ({
    competition: one(competitions, { fields: [displays.competitionId], references: [competitions.id] }),
}));

export const displaySchema = createSelectSchema(displays);
export const insertDisplaySchema = createInsertSchema(displays);
export type Display = InferSelectModel<typeof displays>;

