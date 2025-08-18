import jwt from 'jsonwebtoken';

// Corrected cookie options for consistency and security
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

    
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
           const token = jwt.sign({ email, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.cookie('sellerToken', token, cookieOptions);
 
        return res.status(200).json({
            success: true,
            message: "Seller logged in successfully",
            seller: {
                email: process.env.SELLER_EMAIL
            }
        });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

    
        
    } catch (error) {
        console.error(error.message); // Use console.error for logging errors
        return res.status(500).json({ success: false, message: "Something went wrong during login." }); 
    }
}

export const isSellerAuth = async (req, res) => {
    try {   
        return res.status(200).json({ success: true, message: "Seller is authenticated." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};


export const sellerLogout = async (req, res) => {
    try {
       
        res.clearCookie('sellerToken', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        return res.status(200).json({ success: true, message: "Seller logged out successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong during logout." });
    }
};
