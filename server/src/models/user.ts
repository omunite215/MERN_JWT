import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now(),
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
}, { timestamps: true });

export const User = model('User', userSchema);