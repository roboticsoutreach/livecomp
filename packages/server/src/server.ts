import { log } from "./utils/log";
import { program } from "commander";
import { version } from "../package.json";
import { appRouter } from "./trpc/appRouter";
import { createBunServeHandler } from "trpc-bun-adapter";

program
    .name("livecomp-server")
    .version(version)
    .description("Livecomp server that provides a REST API and WebSocket interface");

program.option("-p, --port <port>", "Port to listen on", "3000");
program.parse(process.argv);

const options = program.opts();

const port = parseInt(options.port);

export type AppRouter = typeof appRouter;

Bun.serve(
    createBunServeHandler(
        {
            router: appRouter,
        },
        {
            port,
        }
    )
);

log.info(`Server listening on port ${port}`);

