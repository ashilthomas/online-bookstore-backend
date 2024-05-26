import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
  date: {
    type: Date,
    default: Date.now,
  },
});

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel