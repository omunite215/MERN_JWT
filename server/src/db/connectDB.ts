import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        // biome-ignore lint/style/noNonNullAssertion: ENV VARS
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected successfully at host:${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}