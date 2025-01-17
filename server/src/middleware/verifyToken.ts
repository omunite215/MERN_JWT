import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface SpecialRequest extends Request{
    userId?: string;
}

export const verifyToken = (req: SpecialRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized - token not found" });
        return;
    }
    try {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
            return;
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error in Forgot Password", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}