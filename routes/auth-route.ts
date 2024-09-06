import express from "express";
import { login, profile, register } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", auth, profile)

export default router;
