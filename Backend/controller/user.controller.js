import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Register controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    user = new User({ name, email, password });
    await user.save();

    // Generating JWT token
    const payLoad = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payLoad,
      process.env.JWT_SECRITY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
          },
          token,
          message: "Registered successfully",
        });
      }
    );
  } catch (error) {
    console.error("Error in register:", error.message);
    return res.status(400).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const payLoad = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payLoad,
      process.env.JWT_SECRITY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error in login:", error.message);
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get current user detail
export const getUserDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error in getUserDetail:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      user.email = req.body.email;
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.address) {
      user.address = {
        address: req.body.address.address || user.address?.address || "",
        city: req.body.address.city || user.address?.city || "",
        postalCode: req.body.address.postalCode || user.address?.postalCode || "",
        country: req.body.address.country || user.address?.country || "",
      };
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Forgot password - Generate Reset Token
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide an email address" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email address" });
    }

    // Generate plain token
    const resetToken = crypto.randomBytes(24).toString("hex");

    // Hash token to store in database
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset link generated successfully",
      resetToken, // Returned so frontend can navigate or display link directly
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Reset password with token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset token is invalid or has expired" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully. You can now login.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    return res.status(500).json({ message: error.message });
  }
};