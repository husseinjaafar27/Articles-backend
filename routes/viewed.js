import express from "express";

import {
  getViewedByPeriod,
  migrateViewed,
} from "../controllers/viewedController.js";

// middleware
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/migrate", migrateViewed);
router.get("/getPeriod/:id", userAuth, getViewedByPeriod);

export default router;
