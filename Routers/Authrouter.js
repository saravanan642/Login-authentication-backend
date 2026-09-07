const express = require("express");

const { SentOtp ,VerifyOTP , login,forgotpassword, resetpassword, checkAuth, logout} = require("../Controller/authController")
const router = express.Router();

router.post("/send-OTP", SentOtp);
router.post("/verify-otp", VerifyOTP);
router.post("/login-account",login);
router.post("/forgot-password",forgotpassword);
router.post("/reset-password", resetpassword);
router.get("/check-auth",checkAuth);
router.get("/logout",logout)
module.exports = router;