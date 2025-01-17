import { User } from "@/models/user";
import type { Request, Response } from "express";
import { hash, compare } from "bcrypt-ts";
import { generateTokenAndSetCookie } from "@/utils/generateTokenAndSetCookie";
import crypto from "node:crypto";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationToken, sendWelcomeEmail } from "@/mailtrap/emails";
import generateOTP from "@/utils/otp";

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }

        const hashedPassword = await hash(password, 10);
        const verificationToken = generateOTP();
        const expirationInMilliseconds = Date.now() + 24 * 60 * 60 * 1000; // Milliseconds since epoch
        const expirationDate = new Date(expirationInMilliseconds);
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: expirationDate,
        });
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationToken(user.email, verificationToken);
        res
            .status(201)
            .json({ success: true, message: "User created successfully", user: user });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            res.status(400).json({ message: "Validation Code is Expired!!" });
            return;
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ success: true, message: "Email has been verfied successfully", user })
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User Does not Exists" });
            return;
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ success: false, message: "Invalid Credentials" });
            return;
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({ success: true, message: "User logged in successfully", user });
    } catch (error) {
        console.error("Error in Login Function", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" })
};


export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User not Found!!" });
            return;
        }
        const resetToken = crypto.randomBytes(16).toString('hex');
        const expirationInMilliseconds = Date.now() + 1 * 60 * 60 * 1000; // Milliseconds 1 Hour
        const expirationDate = new Date(expirationInMilliseconds);

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = expirationDate;

        await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({ success: true, message: "Password reset link sent successfully" })
    } catch (error) {
        console.error("Error in Forgot Password", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Token Expired!!" });
            return;
        }

        const hashedPassword = await hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: "Password Reset Successful!!" })
    } catch (error) {
        console.error("Error in Reset Password", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};


export const checkAuth = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            res.status(400).json({ success: false, message: "Token Expired!!" });
            return;
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in Forgot Password", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}
