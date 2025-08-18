import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing Details"});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({success: false, message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

       
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV  === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV  === 'production' ? 'None' : 'strict', // Adjust sameSite attribute based on environment
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({
            success: true,
            message: "User registered successfully",
            user: {
                // id: user._id, 
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {
        console.log(error);
        res.json({success: false , message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({success: false, message: "Missing Details"});
        }
        
        // Check if user exists
        const user = await User.findOne({email});


        if (!user) {
            return res.json({success: false, message: "Invalid Email or Password."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: "Invalid Email or Password."});
        }

        // If password matches, generate a token
        if(isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            return res.json({success: true, token, user: {name: user.name}});
        } else {
            return res.json({success: false, message: "Email or Password was incorrect."});
        }


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV  === 'production',
            sameSite: process.env.NODE_ENV  === 'production' ? 'None' : 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({
            success: true,
            message: "User registered successfully",
            user: {
                // id: user._id, 
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.json({success: false , message: error.message});
    }
};


export { register, login };