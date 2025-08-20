import userModel from "../models/userModel.js";

// update user cart data : api/cart/update

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

       await userModel.findByIdAndUpdate(userId, { cart: cartItems });
       res.status(200).json({ success: true, message: "Cart updated successfully." });   
    } catch (error) {
        console.error(error.message); // Use console.error for logging errors
        res.status(500).json({ success: false, message: "Something went wrong while updating the cart." });
    }
} 