import express from "express";

import {
  createAccount,
  login,
  verifiedSignUp,
} from "../controllers/userController.js";

// utils
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/verify", userAuth, verifiedSignUp);
router.post("/login", login);

export default router;
