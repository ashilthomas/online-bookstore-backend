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
                cartItem => cartItem.product === item.product
            );

            if (existingItem) {
               
                existingItem.quantity += item.quantity;
            } else {
                
                user.cart.push(item);
            }
        }

        await user.save();

        res.json({ message: 'Cart updated successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export { addCart };
