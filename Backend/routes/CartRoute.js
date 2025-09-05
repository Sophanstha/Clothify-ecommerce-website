import { Router } from "express";
import { addToCart, changeQuantity, deleteCart, getCartDeatil, merge } from "../controller/cart.controller.js";
import protect from "../MiddleWare/authhMiddleWare.middlewar.js";

const CartRoute = Router();
CartRoute.route("/addto-cart").post(protect,addToCart)
CartRoute.route("/changeQuantity").put(changeQuantity)
CartRoute.route("/deleteCart").delete(deleteCart)
CartRoute.route("/cartDetail").get(getCartDeatil)
CartRoute.route("/merge").post(protect,merge)
export default CartRoute;
