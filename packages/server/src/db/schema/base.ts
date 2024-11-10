import { timestamp, uuid } from "drizzle-orm/pg-core";

export const baseColumns = {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
};

