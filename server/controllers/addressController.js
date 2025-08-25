import addressModel from "../models/addressModel.js";

// Add a new address - api/address/add
export const addAddress = async (req, res) => {
    try {

        const userId = req.userId;
        const { firstName, lastName, street, city, state, zipCode, country, phone, email } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        const newAddress = new addressModel({
            userId,
            firstName,
            lastName,
            street,
            city,
            state,
            zipCode,
            country,
            phone,
            email
        });

        await newAddress.save();
        res.status(200).json({ success: true, message: "Address added successfully." });
    } catch (error) {
        console.error("Error adding address:", error);
        // Better error handling for Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

// Get all addresses for a user - api/address/get

export const getAddresses = async (req, res) => {
    try {
        const userId = req.userId;

        const addresses = await addressModel.find({ userId });

        res.status(200).json({success: true, addresses });
        
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Failed to fetch addresses" });
    }
}