import { Role } from "@livecomp/server/src/db/schema/auth";
import { PropsWithChildren, useContext, useMemo } from "react";
import { AuthContext } from "../../../utils/context";

const roleMappings: Record<Role, Role[]> = {
    viewer: [],
    scorer: ["viewer"],
    admin: ["scorer", "viewer"],
    sysadmin: ["admin", "scorer", "viewer"],
};

export default function Restricted({ role, children }: { role: Role } & PropsWithChildren) {
    const userContext = useContext(AuthContext);

    const hasRole = useMemo(() => {
        if (!userContext.hasLoaded || !userContext.user) return false;
        if (userContext.user.role === role) return true;

        return roleMappings[userContext.user.role].includes(role);
    }, [role, userContext]);

    return hasRole ? children : null;
}

