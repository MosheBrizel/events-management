import { Router } from "express";
const router = Router();

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const upload = multer({ dest: __dirname + "/uploads" });
import RegistrationEventFunction from "../controllers/routerEvents/RegistrationEventFunction.js";
import checkAuth from "../middleware/checkAuth.js";
import allEventsFunction from "../controllers/routerEvents/allEventsFunction.js";
import allEventsRegisteredFunction from "../controllers/routerEvents/allEventsRegisteredFunction.js";
import createEventFunction from "../controllers/routerEvents/createEventFunction.js";
import multer from "multer";

router.post("/RegistrationEvent", checkAuth, RegistrationEventFunction);
router.get("/allEvents", allEventsFunction);
router.get("/allEventsRegistered", checkAuth, allEventsRegisteredFunction);
router.post(
  "/createEvent",
  checkAuth,
  upload.array("image"),
  createEventFunction
);
export default router;
