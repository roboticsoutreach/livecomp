import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MatchType = t.Union([t.Literal("LEAGUE"), t.Literal("KNOCKOUT")], {
  additionalProperties: false,
});
