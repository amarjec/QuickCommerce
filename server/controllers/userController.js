import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// A reusable constant for setting cookie options
// It's a good practice to define this once to ensure consistency.
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Use standard HTTP status codes for better API communication
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "Missing required fields."});
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({success: false, message: "User already exists with this email."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, cookieOptions);

        
        return res.status(201).json({
            success: true,
            message: "User registered and logged in successfully",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false , message: "Something went wrong during registration."});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({success: false, message: "Invalid email or password."});
        }
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, cookieOptions);
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false , message: "Something went wrong during login."});
    }
};

const isAuth = async (req, res) => {
    try {
        // This function relies on a middleware (like userAuth) to attach the user ID to the request object.
        // It checks if a user is authenticated by verifying that the user ID exists on the request object.
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }
        
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

const logoutUser = async (req, res) => {
    try {
       
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong during logout."
        });
    }
};

export {registerUser, loginUser, logoutUser, isAuth};
