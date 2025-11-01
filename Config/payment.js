import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

// Validate required environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay configuration error: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables");
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;