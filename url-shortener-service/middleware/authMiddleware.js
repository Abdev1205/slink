import verifyToken from "../utils/verifyToken.js";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  const { guest } = req.body;

  if (guest === true) {
    req.user = { guest: true };
    return next();
  }

  // For users
  verifyToken(req, res, next, async () => {
    try {
      const user = await User.findById(req.id); // Find user by ID from decoded token
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user data to the request object
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
