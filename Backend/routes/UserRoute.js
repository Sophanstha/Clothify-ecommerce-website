import express, { Router } from "express"
import { login, register } from "../controller/user.controller.js";

const userRoute = Router();
userRoute.route("/register").post(register)
userRoute.route("/login").post(login)
export default userRoute;