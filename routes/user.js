import express from "express";
import { register, login, forgetPassword } from "../controllers/user.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forget/password", forgetPassword);

export default router;
