import { Router } from "express";
import protect from "../MiddleWare/authhMiddleWare.middlewar.js";
import { createCheckout, finalizeOrder, markPay } from "../controller/checkout.controller.js";
import { getSingleOrder, myOrder } from "../controller/order.controller.js";

const orderRouter = Router();
orderRouter.route("/checkout").post(protect, createCheckout);
orderRouter.route("/pay/:id").post(protect, markPay);
orderRouter.route("/pay").post(protect, markPay);
orderRouter.route("/finalize/:id").post(protect, finalizeOrder);
orderRouter.route("/fianalize/:id").post(protect, finalizeOrder);
orderRouter.route("/fianalize").post(protect, finalizeOrder);

orderRouter.route("/my-orders").get(protect, myOrder);
orderRouter.route("/my-oreder").get(protect, myOrder);
orderRouter.route("/my-oreder").post(protect, myOrder);

orderRouter.route("/singleOrder/:id").get(protect, getSingleOrder);
orderRouter.route("/singleOrder/:id").post(protect, getSingleOrder);

export default orderRouter;