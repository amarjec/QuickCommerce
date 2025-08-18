import jwt from 'jsonwebtoken'

const sellerAuth = async (req, res, next) => {
    
    const { sellerToken } = req.cookies;
    
    if (!sellerToken) {
        // If the cookie is not present, return a 401 Unauthorized status.
        return res.status(401).json({ success: false, message: "Not Authorised. Login Again" });
    } 

    try {
        // Verify the token with your JWT secret.
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
           // If valid, pass control to the next middleware or route handler.
           next();
        } else {
            // If the token is invalid or doesn't have the correct payload, return a 401.
            return res.status(401).json({ success: false, message: "Not Authorised. Login Again" });
        }
    } catch (error) {
        // Catch and handle any errors from token verification (e.g., expired or malformed token).
        console.error(error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}

export default sellerAuth;
