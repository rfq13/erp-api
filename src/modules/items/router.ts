import { Router } from "express";
import * as controller from "./controllers/index.js";
import HasAccess from "@src/middleware/HasAccess.js";

const router = Router();

router.get("/", HasAccess("read-item"), controller.readMany);
router.get("/:id", HasAccess("read-item"), controller.read);
router.post("/", HasAccess("create-item"), controller.create);
router.patch("/:id", HasAccess("update-item"), controller.update);
router.delete("/:id", HasAccess("delete-item"), controller.destroy);

export default router;
