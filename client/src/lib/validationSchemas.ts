"use client"

import { z } from "zod"

export const SignUpSchema = z.object({
    name: z.string({ required_error: "Required 2 Characters" }).min(2, "Min. 2 Characters").max(155, "Max 155 Characters"),
    email: z.string({ required_error: "Email is required" }).email().max(50, "Max 50 Characters"),
    password: z.string({ required_error: "Password is required" }).min(8, "Min. 8 Characters"),
    confirmPassword: z.string({ required_error: "Password is required" }).min(8, "Min. 8 Characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont't match",
    path: ["confirmPassword"]
});

export const VerifySchema = z.object({
    code: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export const LoginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email().max(50, "Max 50 Characters"),
    loginPassword: z.string({ required_error: "Password is required" }).min(8, "Min. 8 Characters"),
});

export const ForgotPasswordSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email().max(50, "Max 50 Characters"),
})

export const ResetPasswordSchema = z.object({
    password: z.string({ required_error: "Password is required" }).min(8, "Min. 8 Characters"),
    confirmPassword: z.string({ required_error: "Password is required" }).min(8, "Min. 8 Characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont't match",
    path: ["confirmPassword"]
});
