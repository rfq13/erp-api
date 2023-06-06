import express, { Express } from "express";
import authRouter from "./modules/auth/router.js";
import usersRouter from "./modules/users/router.js";
import rolesRouter from "./modules/roles/router.js";
import itemsRouter from "./modules/items/router.js";
import customerRouter from "./modules/customers/router.js";
import invoiceRouter from "./modules/invoices/router.js";
import { Authenticated } from "./middleware/Authenticated.js";

export default function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use(`/auth`, authRouter);
  app.use(`/users`, usersRouter);
  app.use(`/roles`, rolesRouter);
  app.use(`/items`, Authenticated, itemsRouter);
  app.use(`/customers`, customerRouter);
  app.use(`/invoices`, invoiceRouter);

  return app;
}
