import { TopNavigation, AppLayout, SideNavigation, BreadcrumbGroup } from "@cloudscape-design/components";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../../../utils/context";
import { followHandler, route } from "../../../utils/followHandler";
import { api } from "../../../utils/trpc";
import { Navigate, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";

export default function ConsoleLayout({ children }: PropsWithChildren) {
    const navigate = useNavigate();
    const location = useLocation();
    const matches = useRouterState({ select: (state) => state.matches });

    const breadcrumbs = matches
        .filter((match) => match.context.title && match.context.title !== "Livecomp")
        .map(({ pathname, context }) => {
            return {
                text: context.title,
                href: pathname,
            };
        });

    const utils = api.useUtils();

    const userContext = useContext(AuthContext);

    if (userContext.hasLoaded && !userContext.user) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <>
            <TopNavigation
                identity={{
                    href: "#",
                    title: "Livecomp",
                    onFollow: () => navigate({ to: "/console" }),
                }}
                utilities={[
                    {
                        type: "menu-dropdown",
                        text: userContext.user?.name,
                        onItemFollow: (e) => {
                            if (e.detail.id === "logout") {
                                localStorage.removeItem("accessToken");
                                utils.users.fetchCurrent.invalidate().catch(console.log);
                                navigate({ to: "/auth/login" });
                                return;
                            }

                            followHandler(navigate)(e);
                        },
                        description: userContext.user?.username,
                        iconName: "user-profile",
                        items: [{ id: "logout", text: "Logout", href: "#" }],
                    },
                ]}
            />
            <AppLayout
                breadcrumbs={<BreadcrumbGroup onFollow={followHandler(navigate)} items={breadcrumbs} />}
                navigation={
                    <SideNavigation
                        onFollow={followHandler(navigate)}
                        activeHref={location.pathname}
                        header={{ href: "/", text: "Console" }}
                        items={[
                            { type: "link", text: "Competitions", href: route("/console/competitions") },
                            { type: "link", text: "Games", href: route("/console/games") },
                            { type: "link", text: "Venues", href: route("/console/venues") },
                        ]}
                    />
                }
                toolsHide
                content={children}
            />
        </>
    );
}

