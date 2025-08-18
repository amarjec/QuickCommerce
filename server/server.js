import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ConnectDB from './configs/mongdb.js';
import userRouter from './routes/userRoute.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 4000; 

// Ensure the database connection is established
await ConnectDB(); 

const allowedOrigins = ['http://localhost:5173', 'https://github.com/amarjec/QuickCommerce'];

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to QuickCommerce Server!');
});
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
