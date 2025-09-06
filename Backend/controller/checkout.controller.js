import Checkout from "../model/checkout.model.js";

export const createCheckout = async (req, res) => {
  try {
    const { checkoutItem, shippingAddress, totalPrice, payMentDetail } =
      req.body;

    if (!checkoutItem || checkoutItem.length === 0) {
      return res.status(400).json({ message: "No checkout items provided" });
    }

    const checkout = new Checkout({
      user: req.user._id, // assuming req.user is set by auth middleware
      checkoutItem,
      shippingAddress,
      totalPrice,
      isPaid: false,
      payMentDetail,
      paymentStatus: "Pending",
    });

    const createdCheckout = await checkout.save();
    res.status(201).json(createdCheckout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// api to mark the pay
export const markPay = async (req, res) => {
  try {
    const { paymentStatus, payMentDetail } = req.body;
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(400).json({
        message: "checkout not found",
      });
    }
    if (paymentStatus === "Pay") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.payMentDetail = payMentDetail;
      checkout.paidAt = new Date.now();
      await checkout.save();

      return res.status(200).json({
        message: "checkout data",
        data: checkout,
      });
    } else {
      return res.status(400).json({
        message: "Invalid Payment Status",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error,
    });
  }
};




 



