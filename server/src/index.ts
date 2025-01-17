import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "@/db/connectDB";
import authRouter from "@/routes/auth.routes";
import cors from "cors";
const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB();
    console.log(`Server has been started succefully at http://localhost:${port}`);
})