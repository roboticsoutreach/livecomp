import { SchemaUser } from "@livecomp/sdk/src/schema";
import { createContext } from "react";

export const AuthContext = createContext<undefined | SchemaUser>(undefined);

