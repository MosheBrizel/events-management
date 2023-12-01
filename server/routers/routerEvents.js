import { Router } from "express";
const router = Router();

import RegistrationEventFunction from "../controllers/routerEvents/RegistrationEventFunction.js";
import checkAuth from "../middleware/checkAuth.js";
import allEventsFunction from "../controllers/routerEvents/allEventsFunction.js";
import allEventsRegisteredFunction from "../controllers/routerEvents/allEventsRegisteredFunction.js";

router.post("/RegistrationEvent", checkAuth, RegistrationEventFunction);
router.get("/allEvents", allEventsFunction);
router.get("/allEventsRegistered", checkAuth, allEventsRegisteredFunction);
export default router;
