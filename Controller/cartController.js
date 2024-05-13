import UserModel from "../models/userModel.js";

const addCart = async (req, res) => {
    try {
        const { userId, cart } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        for (const item of cart) {
            const existingItem = user.cart.find(
                cartItem => cartItem.product.toString() === item.product
            );

            if (existingItem) {
                // If the item already exists in the cart, return an error message
                return res.status(400).json({ error: 'Product already added to cart' });
            } else {
                // If the item doesn't exist, add it to the cart
                user.cart.push({
                    product: item.product,
                    quantity: item.quantity
                });
            }
        }

        const cartData = await user.save();

        res.json({ message: 'Cart updated successfully', cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { addCart };
