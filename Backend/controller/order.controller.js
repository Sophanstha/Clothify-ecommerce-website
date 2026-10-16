import Order from "../model/order.model.js";
import User from "../model/user.model.js";

export const myOrder = async (req, res) => {
    try {
        const myOrders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1
        });
        return res.status(200).json({
            message: "order succesfully fetch",
            data: myOrders || []
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const foundOrder = await Order.findById(req.params.id).populate("user", "name email");
        if (!foundOrder) {
            return res.status(404).json({
                message: "no order is found"
            });
        }
        return res.status(200).json({
            message: "single order data",
            data: foundOrder
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};