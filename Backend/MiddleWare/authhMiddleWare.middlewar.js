import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRITY);

      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.user.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
export const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRITY);
      req.user = await User.findById(decoded.user.id).select("-password");
    }
    next();
  } catch {
    next();
  }
};

export const checkRole = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "unauthorized access role is not admin"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default protect;
