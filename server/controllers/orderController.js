import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';



// order placed COD - api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address} = req.body;

        if (items.length === 0 || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Calculate total amount from items
        let amount = items.reduce( async(acc, item) => {
            const product = await productModel.findById(item.product);
            return (await acc) + (product.offerPrice * item.quantity);
        }, 0);
        
        // add tax charge 2%
        amount  += Math.floor(amount * 0.02)
        // Create a new order
        await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        res.status(201).json({ success: true, message: "Order placed successfully"});
        
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
}

// get order by user Id - api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;


        const orders = await orderModel.find({
            userId,
            $or: [{ paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }   
}

// get all orders(for seller /admin) - api/order/all

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            $or: [{ paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
        
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }   
}           