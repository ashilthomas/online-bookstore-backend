import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ashilthomas31:3333333310@cluster0.yczpjlo.mongodb.net/online-bookeStore');
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};