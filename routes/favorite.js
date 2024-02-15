import express from "express";

import {
  addFavoriteViewed,
  getFavoritesUser,
} from "../controllers/favoriteController.js";

// utils
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/add/:id", userAuth, addFavoriteViewed);
router.get("/get", userAuth, getFavoritesUser);

export default router;
