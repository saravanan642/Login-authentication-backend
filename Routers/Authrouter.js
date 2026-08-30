const express = require("express");

const { SentOtp } = require("../Controller/authController")
const router = express.Router();

router.post("/send-OTP", SentOtp)
module.exports = router;