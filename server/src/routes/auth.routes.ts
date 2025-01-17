import {
    checkAuth,
	forgotPassword,
	login,
	logout,
	resetPassword,
	signup,
	verifyEmail,
} from "@/controllers/auth.controller";
import { verifyToken } from "@/middleware/verifyToken";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
