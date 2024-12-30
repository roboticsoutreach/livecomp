import { integer, pgEnum, pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { competitions } from "./competitions";
import { relations, type InferSelectModel } from "drizzle-orm";
import { teams } from "./teams";
import { startingZones } from "./games";
import { matchScoreEntries } from "./scores";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const matchPeriodStatus = pgEnum("match_period_status", ["notStarted", "inProgress", "paused", "finished"]);
export const matchPeriodType = pgEnum("match_period_type", ["league", "knockouts"]);

export const matchPeriods = pgTable("match_periods", {
    ...baseColumns,

    name: varchar().notNull(),
    type: matchPeriodType().notNull().default("league"),

    status: matchPeriodStatus().default("notStarted").notNull(),
    cursorPosition: integer().default(0).notNull(),

    startsAt: timestamp({ withTimezone: false }).notNull(),

    competitionId: uuid()
        .references(() => competitions.id)
        .notNull(),
});

export const matchPeriodsRelations = relations(matchPeriods, ({ one, many }) => ({
    competition: one(competitions, { fields: [matchPeriods.competitionId], references: [competitions.id] }),
    matches: many(matches),
}));

export const matchPeriodSchema = createSelectSchema(matchPeriods);
export const insertMatchPeriodSchema = createInsertSchema(matchPeriods);
export type MatchPeriod = InferSelectModel<typeof matchPeriods>;

export const matches = pgTable(
    "matches",
    {
        ...baseColumns,

        name: varchar().notNull(),

        sequenceNumber: integer().notNull(),

        matchPeriodId: uuid()
            .references(() => matchPeriods.id)
            .notNull(),
    },
    (matches) => ({
        uniqueSequenceNumber: unique("unique_sequence_number").on(matches.sequenceNumber, matches.matchPeriodId),
    })
);

export const matchesRelations = relations(matches, ({ one, many }) => ({
    matchPeriod: one(matchPeriods, { fields: [matches.matchPeriodId], references: [matchPeriods.id] }),
    dependentAssignmentConfigs: many(autoMatchAssignmentConfigs),
    scoreEntries: many(matchScoreEntries),
    assignments: many(matchAssignments),
}));

export const matchSchema = createSelectSchema(matches);
export const insertMatchSchema = createInsertSchema(matches);
export type Match = InferSelectModel<typeof matches>;

export const matchAssignments = pgTable(
    "match_assignments",
    {
        ...baseColumns,

        matchId: uuid()
            .references(() => matches.id, { onDelete: "cascade" })
            .notNull(),

        teamId: uuid().references(() => teams.id, { onDelete: "cascade" }),

        gamePoints: integer().default(0),

        startingZoneId: uuid()
            .references(() => startingZones.id)
            .notNull(),
    },
    (matchAssignments) => ({
        uniqueTeam: unique("unique_team").on(matchAssignments.matchId, matchAssignments.teamId),
        uniqueStartingZone: unique("unique_starting_zone").on(
            matchAssignments.matchId,
            matchAssignments.startingZoneId
        ),
    })
);

export const matchAssignmentsRelations = relations(matchAssignments, ({ one }) => ({
    match: one(matches, { fields: [matchAssignments.matchId], references: [matches.id] }),
    team: one(teams, { fields: [matchAssignments.teamId], references: [teams.id] }),
    autoConfig: one(autoMatchAssignmentConfigs),
}));

export const matchAssignmentSchema = createSelectSchema(matchAssignments);
export const insertMatchAssignmentSchema = createInsertSchema(matchAssignments);
export type MatchAssignment = InferSelectModel<typeof matchAssignments>;

export const autoMatchAssignmentConfigs = pgTable("auto_match_assignment_configs", {
    ...baseColumns,

    assignmentId: uuid()
        .references(() => matchAssignments.id)
        .notNull(),

    targetMatchId: uuid()
        .references(() => matches.id)
        .notNull(),

    position: integer().notNull(), // 0 is the winner, 1 is the runner-up etc.
});

export const autoMatchAssignmentConfigsRelations = relations(autoMatchAssignmentConfigs, ({ one }) => ({
    assignment: one(matchAssignments, {
        fields: [autoMatchAssignmentConfigs.assignmentId],
        references: [matchAssignments.id],
    }),
    targetMatch: one(matches, { fields: [autoMatchAssignmentConfigs.targetMatchId], references: [matches.id] }),
}));

export const autoMatchAssignmentConfigSchema = createSelectSchema(autoMatchAssignmentConfigs);
export const insertAutoMatchAssignmentConfigSchema = createInsertSchema(autoMatchAssignmentConfigs);
export type AutoMatchAssignmentConfig = InferSelectModel<typeof autoMatchAssignmentConfigs>;

