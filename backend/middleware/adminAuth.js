import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const {token} = req.headers;
    
    if (!token) {
      return res.json({success: false, message: "Not Authorized, Login again"});
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the token contains admin role
    if (!token_decode.id || token_decode.role !== 'admin') {
      return res.json({success: false, message: "Not Authorized, Admin access required"});
    }

    req.adminId = token_decode.id; // Attach admin ID to request
    next();

  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

export default adminAuth;