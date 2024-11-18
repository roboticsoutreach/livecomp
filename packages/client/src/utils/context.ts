import { User } from "@livecomp/server/src/db/schema/auth";
import { createContext } from "react";

export const AuthContext = createContext<undefined | User>(undefined);

