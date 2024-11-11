import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashboardPage from "./pages/dashboard";
import CompetitionsPage from "./pages/competitions";
import CreateCompetitionPage from "./pages/competitions/create";
import GamesPage from "./pages/games";
import ViewGamePage from "./pages/games/view";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "/games",
        element: (
            <ProtectedRoute>
                <GamesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/games/:id",
        element: (
            <ProtectedRoute>
                <ViewGamePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/competitions",
        element: (
            <ProtectedRoute>
                <CompetitionsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/competitions/create",
        element: (
            <ProtectedRoute>
                <CreateCompetitionPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    { path: "/auth/login", element: <LoginPage /> },
]);

export default function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    url: `${import.meta.env.VITE_SERVER_URL}/trpc`,
                }),
            ],
        })
    );

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </api.Provider>
    );
}

