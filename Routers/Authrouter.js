const express = require("express");

const { SentOtp ,VerifyOTP } = require("../Controller/authController")
const router = express.Router();

router.post("/send-OTP", SentOtp);
router.post("/verify-otp", VerifyOTP)
module.exports = router;