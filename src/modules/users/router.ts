import { Router } from "express";
import * as controller from "./controllers/index.js";
import { Authenticated } from "@src/middleware/Authenticated.js";
import HasAccess from "@src/middleware/HasAccess.js";

const router = Router();

router.get("/", Authenticated, HasAccess("read-user"), controller.readMany);
router.get("/:id", controller.read);
router.post("/", controller.invite);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
