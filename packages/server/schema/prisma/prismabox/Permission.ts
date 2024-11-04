import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const Permission = t.Union([t.Literal("ManageCompetitions")], {
  additionalProperties: false,
});
