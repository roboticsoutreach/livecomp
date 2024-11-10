import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { games } from "./games";
import { matchPeriods } from "./matches";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const competitions = pgTable("competitions", {
    ...baseColumns,

    name: varchar().notNull(),
    shortName: varchar().notNull(),
    startsAt: timestamp().notNull(),
    endsAt: timestamp().notNull(),

    gameId: uuid().notNull(),
    venueId: uuid().notNull(),
});

export const competitionRelations = relations(competitions, ({ one, many }) => ({
    game: one(games, { fields: [competitions.gameId], references: [games.id] }),
    matchPeriods: many(matchPeriods),
}));

export const competitionSchema = createSelectSchema(competitions);
export const insertCompetitionSchema = createInsertSchema(competitions);
export type Competition = InferSelectModel<typeof competitions>;

