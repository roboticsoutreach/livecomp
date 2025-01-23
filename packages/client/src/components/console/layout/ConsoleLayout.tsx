import {
    TopNavigation,
    AppLayout,
    SideNavigation,
    BreadcrumbGroup,
    Flashbar,
    SideNavigationProps,
} from "@cloudscape-design/components";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context";
import { followHandler, route } from "../../../utils/followHandler";
import { api } from "../../../utils/trpc";
import { Navigate, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { flashbarItemsAtom } from "../../../state/flashbars";
import useDateTime from "../../../hooks/useDate";
import { DateTime } from "luxon";
import { applyMode, Mode } from "@cloudscape-design/global-styles";

export default function ConsoleLayout({ children }: PropsWithChildren) {
    const navigate = useNavigate();
    const location = useLocation();
    const matches = useRouterState({ select: (state) => state.matches });

    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        applyMode(darkMode ? Mode.Dark : Mode.Light);

        localStorage.setItem("darkMode", darkMode ? "true" : "false");
    }, [darkMode]);

    const flashbarItems = useAtomValue(flashbarItemsAtom);

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

    const now = useDateTime();

    if (userContext.hasLoaded && !userContext.user) {
        return <Navigate to="/auth/login" />;
    }

    const sysAdminItems: SideNavigationProps["items"] = [
        { type: "link", text: "Users", href: route("/console/users") },
    ];

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
                        type: "button",
                        text: darkMode ? "Dark mode" : "Light mode",
                        onClick: () => setDarkMode((prev) => !prev),
                    },
                    {
                        type: "button",
                        text: now.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
                    },
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
                        items: [
                            { id: "changePassword", text: "Change password", href: route("/console/changePassword") },
                            { id: "logout", text: "Logout", href: "#" },
                        ],
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
                            ...(userContext.user?.role === "sysadmin" ? sysAdminItems : []),
                        ]}
                    />
                }
                toolsHide
                notifications={<Flashbar items={flashbarItems} stackItems />}
                content={<>{children}</>}
            />
        </>
    );
}

