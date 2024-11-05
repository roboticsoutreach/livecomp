import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./modules/validation.ts";

import "@cloudscape-design/global-styles/index.css";

const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: <LoginPage />,
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);

