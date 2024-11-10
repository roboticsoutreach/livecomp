import Elysia from "elysia";
import { loginRouter } from "./routes/login.router";
import { usersRouter } from "./routes/users.router";

export const authRouter = new Elysia({
    prefix: "auth",
    detail: {
        tags: ["Auth"],
    },
})
    .use(loginRouter)
    .use(usersRouter);

