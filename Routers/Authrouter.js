const express = require("express");

const { SentOtp ,VerifyOTP , login} = require("../Controller/authController")
const router = express.Router();

router.post("/send-OTP", SentOtp);
router.post("/verify-otp", VerifyOTP);
router.post("/login-account",login)
module.exports = router;