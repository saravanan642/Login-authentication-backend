const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserdataSchema = new Schema({


    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    address: {
        type: String,
        trim: true
    },

    city: {
        type: String,
        trim: true
    },

    state: {
        type: String,
        trim: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, {
    timestamps: true
});
const Userdeatils =  model.UserData || model("UserData", UserdataSchema);

module.exports = Userdeatils;
