const UserModel = require("../Models/userData");
const OtpToken = require("../Models/OtpVerification");
const EmailNotification = require("../utils/Emailnotificatoin");



const SentOtp = async (req, res) => {

    try {

        // Get data from request body
        const { email, purpose } = req.body;


        // Check email
        if (!email) {
            return res.json({
                success: false,
                message: "Email is required. Please provide an email"
            });
        }


        // Clean email
        const UserEmail = email.toLowerCase().trim();


        // Find user
        const existingUser = await UserModel.findOne({
            email: UserEmail
        });


        // FORGOT PASSWORD / RESET PASSWORD
        // User must exist
        if (
            purpose === "forgotpassword" ||
            purpose === "resetpassword"
        ) {

            if (!existingUser) {
                return res.json({
                    success: false,
                    message: "Account not found"
                });
            }

        }


        // REGISTER / CREATE ACCOUNT
        // User should NOT already exist
        else {

            if (existingUser) {
                return res.json({
                    success: false,
                    message: "Account already exists. Please login"
                });
            }

        }


        // Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        );


        // OTP expiry - 6 minutes
        const expiry = new Date(
            Date.now() + 6 * 60 * 1000
        );


        // Save OTP in database
        const updateOtp = await OtpToken.updateOne(

            {
                email: UserEmail
            },

            {
                $set: {
                    otp: otp,
                    expiresAt: expiry
                }
            },

            {
                upsert: true
            }

        );



        // HTML Email
        const html = `

        <div style="
            margin:0;
            padding:0;
            background-color:#eef2ff;
            font-family:Arial,Helvetica,sans-serif;
        ">

            <table width="100%" cellpadding="0" cellspacing="0"
                style="padding:50px 15px;">

                <tr>

                    <td align="center">

                        <table width="100%" cellpadding="0" cellspacing="0"
                            style="
                                max-width:580px;
                                background:#ffffff;
                                border-radius:20px;
                                overflow:hidden;
                                box-shadow:0 4px 15px rgba(0,0,0,0.08);
                            ">


                            <!-- HEADER -->

                            <tr>

                                <td align="center"
                                    style="
                                        background:#4f46e5;
                                        padding:35px 20px;
                                    ">

                                    <div style="
                                        width:55px;
                                        height:55px;
                                        background:#ffffff;
                                        border-radius:50%;
                                        line-height:55px;
                                        font-size:25px;
                                        font-weight:bold;
                                        color:#4f46e5;
                                    ">
                                        N
                                    </div>


                                    <h1 style="
                                        margin:15px 0 5px;
                                        color:#ffffff;
                                        font-size:25px;
                                    ">
                                        NVKS private Linated 
                                    </h1>


                                    <p style="
                                        margin:0;
                                        color:#e0e7ff;
                                        font-size:13px;
                                    ">
                                        Secure Learning Platform
                                    </p>

                                </td>

                            </tr>


                            <!-- BODY -->

                            <tr>

                                <td style="
                                    padding:40px 35px;
                                    text-align:center;
                                ">


                                    <h2 style="
                                        margin:0;
                                        color:#111827;
                                        font-size:24px;
                                    ">
                                        Your One-Time Password
                                    </h2>


                                    <p style="
                                        margin:15px 0 0;
                                        color:#6b7280;
                                        font-size:15px;
                                        line-height:1.6;
                                    ">
                                        Use the verification code below to
                                        securely continue with your request.
                                    </p>


                                    <!-- OTP BOX -->

                                    <div style="
                                        margin:30px auto;
                                        padding:20px;
                                        max-width:250px;
                                        background:#eef2ff;
                                        border-radius:12px;
                                        border:1px solid #c7d2fe;
                                    ">


                                        <p style="
                                            margin:0 0 8px;
                                            color:#6366f1;
                                            font-size:12px;
                                            font-weight:bold;
                                            letter-spacing:1px;
                                        ">
                                            YOUR OTP
                                        </p>


                                        <div style="
                                            color:#3730a3;
                                            font-size:35px;
                                            font-weight:bold;
                                            letter-spacing:9px;
                                        ">
                                            ${otp}
                                        </div>


                                    </div>


                                    <!-- EXPIRY -->

                                    <div style="
                                        display:inline-block;
                                        background:#fff7ed;
                                        padding:10px 18px;
                                        border-radius:20px;
                                    ">

                                        <span style="
                                            color:#ea580c;
                                            font-size:13px;
                                            font-weight:bold;
                                        ">
                                            ⏱ Valid for 6 minutes
                                        </span>

                                    </div>


                                    <p style="
                                        margin:25px 0 0;
                                        color:#6b7280;
                                        font-size:13px;
                                        line-height:1.6;
                                    ">
                                        If you did not request this code,
                                        please ignore this email.
                                    </p>


                                    <p style="
                                        margin:15px 0 0;
                                        color:#9ca3af;
                                        font-size:12px;
                                    ">
                                        Never share your OTP or password
                                        with anyone.
                                    </p>


                                </td>

                            </tr>


                            <!-- FOOTER -->

                            <tr>

                                <td align="center"
                                    style="
                                        background:#f9fafb;
                                        padding:22px;
                                        border-top:1px solid #e5e7eb;
                                    ">


                                    <p style="
                                        margin:0;
                                        color:#6b7280;
                                        font-size:12px;
                                    ">
                                        Need help? Contact our support team.
                                    </p>


                                    <p style="
                                        margin:8px 0 0;
                                        color:#9ca3af;
                                        font-size:11px;
                                    ">
                                        © 2026 NVKS  Pvt. Ltd.
                                    </p>


                                </td>

                            </tr>


                        </table>

                    </td>

                </tr>

            </table>

        </div>

        `;


        // Send OTP Email

        const isMailSent = await EmailNotification({

            receiverEmail: UserEmail,

            subject: "OTP Verification - NVKS Technovation",

            dynamicHtml: html

        });


        // Check email sent or not

        if (!isMailSent) {

            return res.json({
                success: false,
                message: "Failed to send OTP to mail. Please try again"
            });

        }


        // Success response

        return res.json({
            success: true,
            message: "OTP sent successfully"
        });



    }

    catch (err) {

        console.log("Send OTP Error:", err.message);

        return res.json({
            success: false,
            message: "Internal server error"
        });

    }

};

const VerifyOTP = async (req, res) => {
    try {
        const { name, email, enteredOTP, password, contact, age, gender, address, city, state } = req.body;

        if (!name || !email || !password || !enteredOTP || !contact || !age || !gender || !address || !city || !state) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const otpData = await OtpToken.findOne({ email });
        if (!otpData) {
            return res.json({ success: false, message: "Email not found" })
        }
        console.log(otpData)
        if (Number(otpData.otp) !== Number(enteredOTP)) {
            return res.json({ success: false, messgae: "Invaild OTP " })

        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: " Email already registered " })
        }

        const saveUser = await UserModel.create({
            name,
            email: email,
            password,
            contact,
            age,
            gender,
            address,
            city,
            state
        });
        if (saveUser) {
            return res.json({ success: true, message: "OTP verfication success", saveUser })
        }


    } catch (err) {
        console.log(err.message)
        console.log("Network Error in the server");
    }
}

const login = async (req, res) => {
    try {

        const value = req.body;

        const { email, password } = value;

        // Check email and password
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please enter email and password"
            });
        }

        // Find user
        const user = await UserModel.findOne({
            email: email,
            password: password
        });

        // User not found
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email and password"
            });
        }

        // Session data
        const saveSession = {
            id: String(user._id),
            fullName: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role
        };

        // Save session
        req.session.user = saveSession;

        req.session.save((err) => {

            if (err) {
                console.log("Session save error:", err);

                return res.json({
                    success: false,
                    message: "Session Error, contact your support team"
                });
            }

            return res.json({
                success: true,
                message: "Login successful",
                data: saveSession
            });

        });

    } catch (err) {

        console.log("Login Error:", err.message);

        return res.json({
            success: false,
            message: "Network error in the server"
        });
    }
};

module.exports = {
    SentOtp,
    VerifyOTP,
    login
};