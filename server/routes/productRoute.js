import express from 'express';
import { upload } from '../configs/multer.js';
import { authSeller } from '../middlewares/authSeller.js';
import { productList, productById, changeStock, addProduct } from '../controllers/productController.js';

const productRouter = express.Router();


productRouter.get('/add', upload.array([images]), authSeller, addProduct); // Route to add product with images
productRouter.get('/list', authSeller, productList); // Route to list all products
productRouter.get('/:id', authSeller, productById); // Route to get a single product by ID
productRouter.put('/stock', authSeller, changeStock); // Route to change product stock

export default productRouter;
