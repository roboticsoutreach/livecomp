import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchPeriodStatus = t.Union(
  [
    t.Literal("NOT_STARTED"),
    t.Literal("IN_PROGRESS"),
    t.Literal("PAUSED"),
    t.Literal("FINISHED"),
  ],
  { additionalProperties: false },
);
