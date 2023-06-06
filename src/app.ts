import express, { static as ExpressStatic, Express } from "express";
import Middleware from "@src/middleware/index.js";
import router from "@src/router.js";
import session from "express-session";
import { UserSession } from "@src/middleware/Authenticated.js";

declare module "express-session" {
  interface SessionData {
    user: UserSession;
  }
}

export async function createApp() {
  const app: Express = express();

  app.use(
    session({
      secret: "rahasia",
      resave: false,
      saveUninitialized: true,
    })
  );

  const middleware = new Middleware(app);
  middleware.registerBeforeRoutes();

  app.use("/assets", ExpressStatic("src/assets"));
  app.use("/v1", router());

  middleware.registerAfterRoutes();

  return app;
}
