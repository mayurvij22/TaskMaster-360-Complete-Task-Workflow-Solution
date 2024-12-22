import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

// Middleware to authenticate users based on JWT
export const authenticate = async (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.jwt;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user based on the ID from the token
    req.user = await User.findById(decoded.userId);

    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
  } catch (error) {
    // Catch errors related to token verification
    return res.status(401).json({ message: `Unauthorized: ${error.message}` });
  }

  // Proceed to the next middleware or route handler
  next();
};
