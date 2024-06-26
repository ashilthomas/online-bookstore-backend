import paymentModel from "../models/paymentModel.js";
import UserModel from "../models/userModel.js";

const getallOrders = async (req, res) => {
     
  console.log("ri");
    const userId = req.user;
    console.log("hewrhkjweh",userId);
    
  try {
   

    
    // Find the user by email
    const user = await UserModel.findOne({ email: userId.data });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find orders associated with the user's _id
    const orders = await paymentModel.find({ user: user._id }).populate("product")

    

    // Send the orders as a response
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export { getallOrders };
