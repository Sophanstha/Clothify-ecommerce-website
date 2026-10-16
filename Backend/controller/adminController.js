import order from "../model/order.model.js";
import Product from "../model/product.model.js";
import User from "../model/user.model.js";

// get all the user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({
      message: "all user data",
      data: users,
    });
  } catch (error) {
    console.error("Error in getAllUser:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// add new user by Admin
export const addNewUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();

    const sanitizedUser = await User.findById(user._id).select("-password");

    return res.status(201).json({
      message: "user created successfully",
      data: sanitizedUser,
    });
  } catch (error) {
    console.error("Error in addNewUser:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// update userDetail
export const updateUserDetail = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.role) user.role = req.body.role;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    const sanitizedUser = await User.findById(updatedUser._id).select("-password");

    return res.status(200).json({
      message: "user data updated successfully",
      data: sanitizedUser,
    });
  } catch (error) {
    console.error("Error in updateUserDetail:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// delete userData 
export const deleteUserDate = async (req, res) => {
  try {
    const deluser = await User.findByIdAndDelete(req.params.id);
    if (!deluser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "user deleted successfully",
      data: deluser,
    });
  } catch (error) {
    console.error("Error in deleteUserDate:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// get All Product list
export const getAllProducTList = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "product list",
      data: product,
    });
  } catch (error) {
    console.error("Error in getAllProducTList:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// get All the Order List
export const getAllOrderList = async (req, res) => {
  try {
    const orderList = await order.find().populate("user", "name email").sort({ createdAt: -1 });
    return res.status(200).json({
      message: "order list",
      data: orderList,
    });
  } catch (error) {
    console.error("Error in getAllOrderList:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// updateOrderStatus 
export const updateOrderStatus = async (req, res) => {
  try {
    const orders = await order.findById(req.params.id);

    if (!orders) {
      return res.status(404).json({
        message: "no order found",
      });
    }

    // Capitalize status if needed to match enum ["Processing", "Shipped", "Delivered", "Cancel"]
    let newStatus = req.body.status || orders.status;
    const lower = newStatus.toLowerCase();
    if (lower === "processing") newStatus = "Processing";
    else if (lower === "shipped") newStatus = "Shipped";
    else if (lower === "delivered" || lower === "deliverd") newStatus = "Delivered";
    else if (lower === "cancel" || lower === "cancelled") newStatus = "Cancel";

    orders.status = newStatus;
    if (newStatus === "Delivered") {
      orders.deriverdAt = new Date();
      orders.isDeliverd = true;
    }

    const updatedOrder = await orders.save();
    return res.status(200).json({
      message: "status updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// deleteOrder
export const deleteOrder = async (req, res) => {
  try {
    const delorder = await order.findById(req.params.id);
    if (!delorder) {
      return res.status(404).json({
        message: "no order found",
      });
    }
    await delorder.deleteOne();
    return res.status(200).json({
      message: "order deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteOrder:", error.message);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};