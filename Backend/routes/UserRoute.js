import express, { Router } from "express"
import { getUserDetail, login, register } from "../controller/user.controller.js";
import protect from "../MiddleWare/authhMiddleWare.middlewar.js";

const userRoute = Router();
userRoute.route("/register").post(register)
userRoute.route("/login").post(login)
userRoute.route("/getUserDetail").get(protect,getUserDetail)
export default userRoute;