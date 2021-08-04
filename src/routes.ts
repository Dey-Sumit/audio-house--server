import express from "express";

import authController from "@controllers/auth.controller";
import authMiddleware from "@middlewares/auth.middleware";

const router = express.Router();

router.post("/send-otp", authController.sendOtp());
router.post("/verify-otp", authController.verifyOtp());
// router.post("/api/activate", authMiddleware, activateController.activate);

export default router;
