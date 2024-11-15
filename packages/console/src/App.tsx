import { QueryClientProvider } from "@tanstack/react-query";
import { api, queryClient } from "./utils/trpc";
import { AuthContext } from "./utils/context";
import StreamConsumer from "./components/util/StreamConsumer";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { RouterProvider } from "@tanstack/react-router";

const router = createRouter({
    routeTree,
    context: {
        title: "Livecomp",
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    const { data: currentUser, isPending } = api.users.fetchCurrent.useQuery(undefined, { retry: 1 });

    if (isPending) return <span>Loading...</span>;

    return (
        <AuthContext.Provider value={currentUser}>
            <QueryClientProvider client={queryClient}>
                <StreamConsumer />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

