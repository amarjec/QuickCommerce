import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';


// add product controller -- /api/products/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.file;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {  
                const result = await cloudinary.uploader.upload(item.path,
                    {resource_type: 'image'})
                return result.secure_url;
            }) 
        )

        await productModel.create({...productData, image: imagesUrl});

        return res.status(201).json({ success: true, message: "Product added successfully." }); 
    } catch (error) {
        console.error(error.message); // Use console.error for logging errors
        return res.status(500).json({ success: false, message: "Something went wrong while adding the product." });
        
    }

}

// get product controller -- /api/products/list
export const productList = async (req, res) => {
     try {
        const products = await productModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error.message); // Use console.error for logging errors
        res.status(500).json({ success: false, message: "Something went wrong while fetching products." });
    }
    
}

// get single product controller -- /api/products/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error.message); // Use console.log for logging errors
        res.status(500).json({ success: false, message: "Something went wrong while fetching the product." });
    }

}

// change product instock controller -- /api/products/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await productModel.findByIdAndUpdate(id, { inStock });
        res.status(200).json({ success: true, message: "Product stock updated successfully.", product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Something went wrong while updating product stock." });
    }

} 


