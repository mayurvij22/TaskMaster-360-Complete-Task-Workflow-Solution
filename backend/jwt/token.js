import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

// Function to generate a JWT, save it in cookies, and update user token in the database
export const generateTokenAndSaveInCookies = async (userId, res) => {
  try {
    // Generate JWT with userId and set expiration time
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d", // Token expires in 10 days
    });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "lax", // Prevents CSRF attacks
      path: "/", // Cookie is accessible on all routes
    };

    // Save the token in a cookie
    res.cookie("jwt", token, cookieOptions);

    // Update user in the database with the new token (if required)
    await User.findByIdAndUpdate(userId, { token });

    return token; // Return the generated token
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Could not generate token and save in cookies");
  }
};
