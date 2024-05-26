
import UserModel from "../models/userModel.js";

const addCart = async (req, res) => {
  const userId = req.user;

  
  const { productId, quantity } = req.body;

  try {
    const user = await UserModel.findOne({ email: userId.data });

 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProduct = user.cart.find(
      (item) => String(item.product) === productId 
    );

    if (existingProduct) {
      return res.json({
        success: false,
        message: "Product already added to cart",
      });
    }

    // Add product to user's cart
    user.cart.push({ product: productId, quantity: quantity });

    // Save the updated user document
    const userCart = await user.save();
    const existingCart = userCart.cart;

    res
      .status(200)
      .json({ success: true, message: "Product added to cart", existingCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateQuantity = async (req, res) => {
  const userId = req.user; 
 
  const { productId, quantity } = req.body; 

 

  try {
    // Find and update the cart item directly in the database
    const updatedCartItem = await UserModel.findOneAndUpdate(
      {
        email: userId.data, // Find the user by ID
        "cart.product": productId, // Find the cart item by productId
      },
      {
        $set: { "cart.$.quantity": quantity }, // Update the quantity of the matched cart item
      },
      {
        new: true, // Return the updated document after update
      }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res
      .status(200)
      .json({ message: "Cart item updated successfully", updatedCartItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllCartItems = async (req, res) => {
 
  const userId = req.user;
 
  
  try {
    const user = await UserModel.findOne({ email: userId.data }).populate(
      "cart.product"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

 // Check user object

    const cart = user.cart;
   // Check cart array

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCart = async (req, res) => {
  const userId = req.user;
const {productId}=req.body

 

  try {
   
    if (!productId) {
      return res.json("no product id");
    }
    // Find the user and update their cart by removing the specified product
    const user = await UserModel.findOneAndUpdate({
       email:userId.data},
      { $pull: { cart: { product: productId } } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the product was actually removed
    const wasProductRemoved = !user.cart.some(
      (item) => item.product.toString() === productId
    );

    if (!wasProductRemoved) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    return res.status(200).json({success:true, message: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};


export { addCart, updateQuantity, getAllCartItems, deleteCart };
