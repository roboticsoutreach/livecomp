import {
    TopNavigation,
    AppLayout,
    SideNavigation,
    BreadcrumbGroupProps,
    BreadcrumbGroup,
} from "@cloudscape-design/components";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { followHandler } from "../../utils/followHandler";

export default function LivecompLayout({
    children,
    breadcrumbItems,
}: PropsWithChildren & { breadcrumbItems?: BreadcrumbGroupProps["items"] }) {
    const navigate = useNavigate();

    const user = useContext(AuthContext);

    return (
        <>
            <TopNavigation
                identity={{
                    href: "/",
                    title: "Livecomp",
                    onFollow: followHandler(navigate),
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
                        onItemFollow: followHandler(navigate),
                        description: user?.username,
                        iconName: "user-profile",
                        items: [{ id: "logout", text: "Logout" }],
                    },
                ]}
            />
            <AppLayout
                breadcrumbs={
                    breadcrumbItems && <BreadcrumbGroup onFollow={followHandler(navigate)} items={breadcrumbItems} />
                }
                navigation={<SideNavigation header={{ href: "/", text: "Console" }} items={[]} />}
                toolsHide
                content={children}
            />
        </>
    );
}

