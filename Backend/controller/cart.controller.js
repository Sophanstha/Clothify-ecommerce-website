import Product from "../model/product.model.js";
import Cart from "../model/Cart.model.js";

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ userid: userId }); // ✅ fixed field name
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  } else {
    return null;
  }
};

export const addToCart = async (req, res) => {
  try {
    req.body.userId = req.user?._id; // inject userId from auth
    const { productId, size, quantity, color, guestId, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    }

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
    } else {
      cart = new Cart({
        userid: userId || null, // ✅ fixed
        guestId: guestId || Date.now().toString(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: 0,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({ message: "Cart updated successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// change in quantity
export const changeQuantity = async (req, res) => {
  try {
    const { userId, guestId, size, quantity, productId, color } = req.body;
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        message: "cart doesnot exists",
      });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      // updateQuantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json({
        message: cart,
      });
    } else {
      return res.status(202).json({
        message: "product not found in cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// delete carts
export const deleteCart = async (req, res) => {
  try {
    const { userId, guestId, size, productId, color } = req.body;
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        message: "cart doesnot exists",
      });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json({
        message: "cart deleted successfully",
      });
    } else {
      return res.status(400).status({
        message: "cart does not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// check userlogin
export const getCartDeatil = async (req, res) => {
  try {
    const { userId, guestId } = req.body;
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(400).json({
        message: "cart not found",
      });
    }
    return res.status(200).json({
      message: "Cart data",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// merge carts
export const merge = async (req, res) => {
  try {
    const { guestId } = req.body;
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userid: req.user._id }); // ✅ correct field

    if (guestCart && guestCart.products.length === 0) {
      return res.status(400).json({ message: "Guest cart is empty" });
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();
      await Cart.findOneAndDelete({ guestId });

      return res.status(200).json({ message: "Cart merged successfully", data: userCart });
    } else {
      // ✅ assign to userid instead of user
      guestCart.userid = req.user._id;
      guestCart.guestId = undefined;
      await guestCart.save();

      return res.status(200).json({ message: "Guest cart assigned to user", data: guestCart });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

