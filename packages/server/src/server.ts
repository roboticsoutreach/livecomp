import Elysia from "elysia";
import { log } from "./utils/log";
import { program } from "commander";
import { version } from "../package.json";
import { authRouter } from "./modules/auth/auth.router";
import { swagger } from "@elysiajs/swagger";
import { models } from "./utils/models";
import { cors } from "@elysiajs/cors";

program
    .name("livecomp-server")
    .version(version)
    .description("Livecomp server that provides a REST API and WebSocket interface");

program.option("-p, --port <port>", "Port to listen on", "3000");
program.parse(process.argv);

const options = program.opts();

const port = parseInt(options.port);

new Elysia()
    .use(
        cors({
            credentials: true,
        }) as unknown as Elysia
    )
    .use(models)
    .use(
        swagger({
            documentation: {
                info: {
                    title: "Livecomp API",
                    version: version,
                },
            },
        })
    )
    .use(authRouter)
    .listen(port);

log.info(`Server listening on port ${port}`);

