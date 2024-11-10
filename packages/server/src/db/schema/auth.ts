import { boolean, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base";
import { relations, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const role = pgEnum("role", ["viewer", "scorer", "admin", "sysadmin"]);

export const users = pgTable("users", {
    ...baseColumns,

    name: varchar().notNull(),
    username: varchar().notNull().unique(),

    role: role().default("viewer"),
});

export const userRelations = relations(users, ({ one }) => ({
    password: one(userPasswords),
}));

export const userSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export type User = InferSelectModel<typeof users>;

export const userPasswords = pgTable("user_passwords", {
    ...baseColumns,

    userId: uuid()
        .unique()
        .references(() => users.id)
        .notNull(),

    passwordHash: varchar().notNull(),
});

export const userPasswordRelations = relations(userPasswords, ({ one }) => ({
    user: one(users, { fields: [userPasswords.userId], references: [users.id], relationName: "userPassword" }),
}));

export const userPasswordSchema = createSelectSchema(userPasswords);
export const insertUserPasswordSchema = createInsertSchema(userPasswords);
export type UserPassword = InferSelectModel<typeof userPasswords>;

