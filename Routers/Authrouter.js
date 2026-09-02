const express = require("express");

const { SentOtp ,VerifyOTP , login,forgotpassword} = require("../Controller/authController")
const router = express.Router();

router.post("/send-OTP", SentOtp);
router.post("/verify-otp", VerifyOTP);
router.post("/login-account",login);
router.post("/forgotpassword",forgotpassword)
module.exports = router;