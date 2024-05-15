import UserModel from "../models/userModel.js";


const addCart = async (req, res) => {
   

    console.log(req.body);

  const {userId, productId, quantity } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingProduct = user.cart.find(item => String(item.product) === productId);
    console.log(existingProduct);
    if (existingProduct) {
      return res.json({success:false, message: 'Product already added to cart' });
    }

    // Add product to user's cart
    user.cart.push({ product: productId, quantity: quantity });

    // Save the updated user document
     const userCart =  await user.save();
     const existingCart = userCart.cart

    res.status(200).json({success:true, message: 'Product added to cart', existingCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateQuantity = async (req, res) => {
    const id = req.params.id;
    const {cartId,quantity}=req.body
    console.log(id);
    try {
      // Find the user document by ID
      const user = await UserModel.findById(id); // Assuming you have implemented authentication middleware to get the user ID
      
  console.log(user);
      // Find the cart item within the user's cart array by its ID
      const cartItem = user.cart.find(item => item._id.toString() === cartId);

      console.log(cartItem);
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cartItem.quantity += quantity;
      
      await user.save();
  
      
      return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getAllCartItems = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await UserModel.findById(id).populate('cart.product');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user); // Check user object

        const cart = user.cart;
        console.log(cart); // Check cart array

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export { addCart,updateQuantity,getAllCartItems };
