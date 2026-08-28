const UserModel = require("../Models/userData");
const OtpModel = require("../Models/OtpVerification");

const SentOtp = async (req, res) => {
    try {
        

    } catch (err) {
        console.log(err.message);
        return res.json({ success: false, message: "Internal server error" })

    }
}