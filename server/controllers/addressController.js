import addressModel from "../models/addressModel.js";

// Add address - api/address/add

export const addAddress = async (req, res) => {
    try {
        const { address, userId} = req.body;

        await addressModel.create({ ...address, userId });

        res.status(201).json({ message: "Address added successfully" });
        
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Failed to add address" });
    }
} 

// Get all addresses for a user - api/address/get

export const getAddresses = async (req, res) => {
    try {
        const { userId } = req.query;

        const addresses = await addressModel.find({ userId });

        res.status(200).json({success: true, addresses });
        
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Failed to fetch addresses" });
    }
}