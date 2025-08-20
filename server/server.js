import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ConnectDB from './configs/mongdb.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';


const app = express();
const PORT = process.env.PORT || 4000; 


await ConnectDB();  
await connectCloudinary(); // Connect to Cloudinary


const allowedOrigins = ['http://localhost:5173'];


// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true}));


app.get('/', (req, res) => {
  res.send('Welcome to QuickCommerce Server!');
});


app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter )


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
export default app;
