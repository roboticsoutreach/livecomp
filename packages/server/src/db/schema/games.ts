import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const games = pgTable("games", {
    ...baseColumns,

    name: varchar().notNull(),
});

export const gamesRelations = relations(games, ({ many }) => ({
    startingZones: many(startingZones),
}));

export const gameSchema = createSelectSchema(games);
export const insertGameSchema = createInsertSchema(games);
export type Game = InferSelectModel<typeof games>;

export const startingZones = pgTable("starting_zones", {
    ...baseColumns,

    name: varchar().notNull(),
    color: varchar().notNull(),

    gameId: uuid()
        .references(() => games.id)
        .notNull(),
});

export const startingZonesRelations = relations(startingZones, ({ one }) => ({
    game: one(games, { fields: [startingZones.gameId], references: [games.id] }),
}));

export const startingZoneSchema = createSelectSchema(startingZones);
export const insertStartingZoneSchema = createInsertSchema(startingZones);
export type StartingZone = InferSelectModel<typeof startingZones>;

