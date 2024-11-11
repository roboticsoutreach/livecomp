import { AppRouter } from "@livecomp/server";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
