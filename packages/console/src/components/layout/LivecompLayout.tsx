import {
    TopNavigation,
    AppLayout,
    SideNavigation,
    BreadcrumbGroupProps,
    BreadcrumbGroup,
} from "@cloudscape-design/components";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../../utils/context";
import { useLocation, useNavigate } from "react-router-dom";
import { followHandler } from "../../utils/followHandler";
import { api } from "../../utils/trpc";

export default function LivecompLayout({
    children,
    breadcrumbItems,
}: PropsWithChildren & { breadcrumbItems?: BreadcrumbGroupProps["items"] }) {
    const navigate = useNavigate();
    const location = useLocation();

    const utils = api.useUtils();

    const user = useContext(AuthContext);

    return (
        <>
            <TopNavigation
                identity={{
                    href: "#",
                    title: "Livecomp",
                    onFollow: () => navigate("/"),
                }}
                utilities={[
                    {
                        type: "menu-dropdown",
                        text: "Select competition",
                        onItemFollow: followHandler(navigate),
                        items: [{ id: "manage-competitions", text: "Manage competitions", href: "/competitions" }],
                    },
                    {
                        type: "menu-dropdown",
                        text: user?.name,
                        onItemFollow: (e) => {
                            if (e.detail.id === "logout") {
                                localStorage.removeItem("accessToken");
                                utils.users.fetchCurrent.invalidate().catch(console.log);
                                navigate("/auth/login");
                                return;
                            }

                            followHandler(navigate)(e);
                        },
                        description: user?.username,
                        iconName: "user-profile",
                        items: [{ id: "logout", text: "Logout", href: "#" }],
                    },
                ]}
            />
            <AppLayout
                breadcrumbs={
                    breadcrumbItems && <BreadcrumbGroup onFollow={followHandler(navigate)} items={breadcrumbItems} />
                }
                navigation={
                    <SideNavigation
                        onFollow={followHandler(navigate)}
                        activeHref={location.pathname}
                        header={{ href: "/", text: "Console" }}
                        items={[
                            {
                                type: "section-group",
                                title: "Global",
                                items: [
                                    { type: "link", text: "Competitions", href: "/competitions" },
                                    { type: "link", text: "Games", href: "/games" },
                                ],
                            },
                        ]}
                    />
                }
                toolsHide
                content={children}
            />
        </>
    );
}

