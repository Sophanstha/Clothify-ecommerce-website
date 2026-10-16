import Cart from "../model/Cart.model.js";
import Checkout from "../model/checkout.model.js";
import order from "../model/order.model.js";
import Product from "../model/product.model.js";

export const createCheckout = async (req, res) => {
  try {
    const { checkoutItem, shippingAddress, totalPrice, payMentDetail, paymentMethod } =
      req.body;

    if (!checkoutItem || checkoutItem.length === 0) {
      return res.status(400).json({ message: "No checkout items provided" });
    }

    // Validate Stock and ensure items have image for every product
    const formattedItems = [];
    for (const item of checkoutItem) {
      let productImage = item.image || item.imaage || "";
      if (item.productId) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({
            message: `Product "${item.name}" not found in our catalog`,
          });
        }
        if (product.countInStock < item.quantity) {
          return res.status(400).json({
            message:
              product.countInStock === 0
                ? `Sorry, "${product.name}" is currently out of stock.`
                : `Insufficient stock for "${product.name}". Only ${product.countInStock} item(s) remaining.`,
          });
        }
        if (!productImage && product.images && product.images.length > 0) {
          productImage = product.images[0].url;
        }
      }

      formattedItems.push({
        productId: item.productId,
        name: item.name,
        image: productImage || "https://placehold.co/200x200?text=Product",
        price: Number(item.price),
        size: item.size || "M",
        color: item.color || "Standard",
        quantity: Number(item.quantity) || 1,
      });
    }

    const checkout = new Checkout({
      user: req.user._id,
      checkoutItem: formattedItems,
      shippingAddress,
      totalPrice,
      paymentMethod: paymentMethod || "Cash on Delivery",
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
      return res.status(404).json({
        message: "checkout not found",
      });
    }
    if (paymentStatus === "Pay" || paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = "Paid";
      checkout.payMentDetail = payMentDetail;
      checkout.paidAt = new Date();
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
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const finalizeOrder = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({
        message: "checkout not found",
      });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({
        message: "order already finalized",
      });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // 1. Verify stock availability again right before placing order
      for (const item of checkout.checkoutItem) {
        if (item.productId) {
          const product = await Product.findById(item.productId);
          if (product && product.countInStock < item.quantity) {
            return res.status(400).json({
              message: `Cannot finalize order. "${product.name}" has only ${product.countInStock} items available.`,
            });
          }
        }
      }

      // 2. Create the final order
      const finalized = await order.create({
        user: checkout.user,
        orderItem: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        totalPrice: checkout.totalPrice,
        paymentMethod: checkout.paymentMethod || "Cash on Delivery",
        isPaid: true,
        paidAt: checkout.paidAt || new Date(),
        isDelivered: false,
        paymentStatus: "Paid",
        payMentDetail: checkout.payMentDetail,
      });

      // 3. Deduct stock for all ordered products
      for (const item of checkout.checkoutItem) {
        if (item.productId) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { countInStock: -item.quantity },
          });
        }
      }

      checkout.isFinalized = true;
      checkout.finalizedAt = new Date();
      await checkout.save();

      // delete the cart associated with the user
      await Cart.findOneAndDelete({ userid: checkout.user });

      return res.status(201).json({
        message: "final order detail",
        data: finalized,
      });
    } else {
      return res.status(400).json({
        message: "checkout not paid",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const fianlizes = finalizeOrder;
