import { log } from "./utils/log";
import { program } from "commander";
import { version } from "../package.json";
import { appRouter } from "./appRouter";
import { createBunServeHandler } from "trpc-bun-adapter";
import { createTrpcContext } from "./trpc/trpc";

program
    .name("livecomp-server")
    .version(version)
    .description("Livecomp server that provides a tRPC API with subscriptions");

program.option("-p, --port <port>", "Port to listen on", "3000");
program.parse(process.argv);

const options = program.opts();

const port = parseInt(options.port);

export type AppRouter = typeof appRouter;

Bun.serve(
    createBunServeHandler(
        {
            router: appRouter,
            createContext: createTrpcContext,
            endpoint: "/trpc",
            responseMeta() {
                return {
                    status: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    },
                };
            },
        },
        {
            port,
        }
    )
);

log.info(`Server listening on port ${port}`);

