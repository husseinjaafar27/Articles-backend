import express from "express";

import {
  getViewedById,
  getViewedByPeriod,
  migrateViewed,
} from "../controllers/viewedController.js";

// middleware
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/migrate", migrateViewed);
router.get("/getPeriod/:id", userAuth, getViewedByPeriod);
router.get("/getOne/:id", userAuth, getViewedById);

export default router;
