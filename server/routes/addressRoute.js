import express from 'express';
import authUser from '../middlewares/auth.js';
import { addAddress, getAddresses} from '../controllers/addressController.js';

const addressRouter = express.Router();

// Route to add a new address
addressRouter.post('/add', authUser, addAddress);

// Route to get all addresses for a user
addressRouter.get('/get', authUser, getAddresses);

  
export default addressRouter;