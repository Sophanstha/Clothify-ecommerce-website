import express, { Router } from "express"
import protect, { checkRole } from "../MiddleWare/authhMiddleWare.middlewar.js";
import { createProduct, deleteProduct, getBestSeller, getNewlyArrival, getProduct, similarProduct, singleProduct, updateProductDetail } from "../controller/product.controller.js";

const productrouter = Router();
productrouter.route("/add-Product").post(protect, checkRole ,createProduct)
productrouter.route("/Product/:id").put(protect, checkRole ,updateProductDetail)
productrouter.route("/deleteProduct/:id").delete(protect, checkRole ,deleteProduct)
productrouter.route("/").get(getProduct)
productrouter.route("/singleProduct/:id").get(singleProduct)
productrouter.route("/similarProduct/:id").get(similarProduct)
productrouter.route("/bestSeller").get(getBestSeller)
productrouter.route("/getNewLyArrival").get(getNewlyArrival)
export default productrouter