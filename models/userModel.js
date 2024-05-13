import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
    mxLength: 20,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,

    required: "Email address is required",
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["instructor", "admin"],
    default: "instructor",
  },

  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model.user || mongoose.model("user", userSchema);

export default UserModel;
