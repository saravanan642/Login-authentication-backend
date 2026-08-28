const mongoose = require("mongoose");

const{ Schema, model } = mongoose;

const OtpverifySchema = new Schema({
       email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    otp: {
        type: Number,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }

})

module.exports.OtpToken || model("OtpToken", OtpverifySchema)