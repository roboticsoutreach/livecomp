import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const displayPage = pgEnum("display_page", ["home"]);

export const displays = pgTable("displays", {
    ...baseColumns,

    name: varchar().notNull(),
    description: varchar().notNull(),
    page: displayPage().notNull(),

    displayGroupId: uuid().references(() => displayGroups.id),
});

export const displayRelations = relations(displays, ({ one }) => ({
    displayGroup: one(displayGroups, { fields: [displays.displayGroupId], references: [displayGroups.id] }),
}));

export const displaySchema = createSelectSchema(displays);
export const insertDisplaySchema = createInsertSchema(displays);
export type Display = InferSelectModel<typeof displays>;

export const displayGroups = pgTable("display_groups", {
    ...baseColumns,

    name: varchar().notNull(),
});

export const displayGroupRelations = relations(displayGroups, ({ many }) => ({
    displays: many(displays),
}));

export const displayGroupSchema = createSelectSchema(displayGroups);
export const insertDisplayGroupSchema = createInsertSchema(displayGroups);
export type DisplayGroup = InferSelectModel<typeof displayGroups>;

