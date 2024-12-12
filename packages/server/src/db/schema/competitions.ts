import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { games } from "./games";
import { matchPeriods } from "./matches";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { teams } from "./teams";

export const competitions = pgTable("competitions", {
    ...baseColumns,

    name: varchar().notNull(),
    shortName: varchar().notNull(),
    startsAt: timestamp({ withTimezone: false }).notNull(),
    endsAt: timestamp({ withTimezone: false }).notNull(),

    gameId: uuid().notNull(),
    venueId: uuid().notNull(),
});

export const competitionsRelations = relations(competitions, ({ one, many }) => ({
    game: one(games, { fields: [competitions.gameId], references: [games.id] }),
    matchPeriods: many(matchPeriods),
    teams: many(teams),
}));

export const competitionSchema = createSelectSchema(competitions);
export const insertCompetitionSchema = createInsertSchema(competitions);
export type Competition = InferSelectModel<typeof competitions>;

