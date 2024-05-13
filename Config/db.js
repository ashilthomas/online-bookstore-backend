import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};