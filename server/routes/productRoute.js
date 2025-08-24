import express from 'express';
import upload from '../configs/multer.js';
import sellerAuth from '../middlewares/authSeller.js';
import { productList, productById, changeStock, addProduct } from '../controllers/productController.js';

const productRouter = express.Router();


productRouter.post('/add', upload.array("images"), sellerAuth, addProduct); // Route to add product with images
productRouter.get('/list', productList); // Route to list all products
productRouter.get('/:id',  productById); // Route to get a single product by ID
productRouter.post('/stock', sellerAuth, changeStock); // Route to change product stock

export default productRouter;
