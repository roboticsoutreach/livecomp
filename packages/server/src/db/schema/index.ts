import * as authSchema from "./auth";
import * as competitionsSchema from "./competitions";
import * as gamesSchema from "./games";
import * as matchesSchema from "./matches";
import * as scoresSchema from "./scores";
import * as teamsSchema from "./teams";
import * as venuesSchema from "./venues";

export const schema = {
    ...authSchema,
    ...competitionsSchema,
    ...gamesSchema,
    ...matchesSchema,
    ...scoresSchema,
    ...teamsSchema,
    ...venuesSchema,
};
export type AppSchema = typeof schema;
