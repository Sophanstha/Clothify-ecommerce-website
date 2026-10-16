import { Router } from "express";
import { addToCart, changeQuantity, deleteCart, fetchCartHandler, getCartDeatil, merge } from "../controller/cart.controller.js";
import protect, { optionalAuth } from "../MiddleWare/authhMiddleWare.middlewar.js";

const CartRoute = Router();
CartRoute.route("/").get(optionalAuth, fetchCartHandler);
CartRoute.route("/addto-cart").post(optionalAuth, addToCart);
CartRoute.route("/changeQuantity").put(optionalAuth, changeQuantity);
CartRoute.route("/deleteCart").delete(optionalAuth, deleteCart);
CartRoute.route("/cartDetail").get(optionalAuth, fetchCartHandler);
CartRoute.route("/merge").post(protect, merge);
export default CartRoute;

