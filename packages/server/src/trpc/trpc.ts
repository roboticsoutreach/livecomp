import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { drizzleClient } from "../db/db";
import superjson from "superjson";
import * as jose from "jose";
import { auth } from "../modules/auth/auth.module";

export async function createTrpcContext({ req }: FetchCreateContextFnOptions) {
    if (req.headers.has("authorization")) {
        const token = req.headers.get("authorization")!;

        const { payload } = await jose.jwtVerify(token, auth.encodedSecret, {
            issuer: "livecomp:server",
            audience: "livecomp:client",
        });

        console.log(payload);
    }

    return {
        db: drizzleClient,
    };
}

type Context = Awaited<ReturnType<typeof createTrpcContext>>;

const t = initTRPC.context<Context>().create({});

export const router = t.router;
export const publicProcedure = t.procedure;

//export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {});

