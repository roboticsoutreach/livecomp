import type { Static, TObject } from "@sinclair/typebox";
import { error, t } from "elysia";

export const errorSchema = t.Object({
    message: t.String(),
});

type ErrorCode = Parameters<typeof error>[0];

export function errors<T extends ErrorCode>(...errors: T[]) {
    return Object.fromEntries(errors.map((e) => [e, errorSchema])) as Record<T, typeof errorSchema>;
}

