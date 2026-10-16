import { Router } from "express";
import {
  forgotPassword,
  getUserDetail,
  login,
  register,
  resetPassword,
  updateUserProfile,
} from "../controller/user.controller.js";
import protect from "../MiddleWare/authhMiddleWare.middlewar.js";

const userRoute = Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/getUserDetail").get(protect, getUserDetail);
userRoute.route("/profile").put(protect, updateUserProfile);
userRoute.route("/forgot-password").post(forgotPassword);
userRoute.route("/reset-password/:token").post(resetPassword);

export default userRoute;