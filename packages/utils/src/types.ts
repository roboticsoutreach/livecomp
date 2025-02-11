export type MatchStatus = "notStarted" | "staging" | "inProgress" | "finished";

export type ExcludeNull<T> = T extends null ? never : T;
