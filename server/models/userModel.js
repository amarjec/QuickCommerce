
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
     name: {type: String, required: true},
     email: {type: String, required: true, unique: true}, 
     password: {type: String, required: true, length: { min: 6 } }, // Added length validation
     cart: { type: Array, default: [] }, // Added cart field
 }, {minimize: false}); // Disable minimization to keep empty arrays

const userModel = mongoose.models.user || mongoose.model("user",userSchema)
 
export default userModel;
