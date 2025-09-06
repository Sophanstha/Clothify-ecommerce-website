import {Router} from "express"
import protect from "../MiddleWare/authhMiddleWare.middlewar.js"
import { createCheckout, fianlizes, markPay } from "../controller/checkout.controller.js"

const orderRouter = Router()
orderRouter.route("/checkout").post(protect,createCheckout)
orderRouter.route("/pay").post(protect,markPay)
orderRouter.route("/fianalize").post(protect,fianlizes)
export default orderRouter