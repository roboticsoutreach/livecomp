import type { AppRouter } from "@livecomp/server";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

export const api = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = api.createClient({
    links: [
        httpBatchLink({
            url: `${import.meta.env.VITE_SERVER_URL}/trpc`,
            transformer: SuperJSON,

            async headers() {
                if (!localStorage.getItem("accessToken")) return {};

                return {
                    authorization: localStorage.getItem("accessToken")!,
                };
            },
        }),
    ],
});

