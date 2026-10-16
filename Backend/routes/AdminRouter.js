import { Router } from "express";
import protect, { checkRole } from "../MiddleWare/authhMiddleWare.middlewar.js";
import { addNewUser, deleteOrder, deleteUserDate, getAllOrderList, getAllProducTList, getAllUser, updateOrderStatus, updateUserDetail } from "../controller/adminController.js";

const adminRouter = Router()
adminRouter.route("/getAlluser").get(protect, checkRole, getAllUser)
adminRouter.route("/getAllUser").get(protect, checkRole, getAllUser)
adminRouter.route("/AddnewUser").post(protect, checkRole, addNewUser)
adminRouter.route("/addNewUser").post(protect, checkRole, addNewUser)
adminRouter.route("/updateUserData/:id").post(protect, checkRole, updateUserDetail).put(protect, checkRole, updateUserDetail)
adminRouter.route("/deleteUserDate/:id").delete(protect, checkRole, deleteUserDate)
adminRouter.route("/deleteUser/:id").delete(protect, checkRole, deleteUserDate)
adminRouter.route("/getAllProduct").get(protect, checkRole, getAllProducTList)
adminRouter.route("/getAllOrder").get(protect, checkRole, getAllOrderList)
adminRouter.route("/updateOrderStatus/:id").put(protect, checkRole, updateOrderStatus)
adminRouter.route("/deleteOrder/:id").delete(protect, checkRole, deleteOrder)

export default adminRouter;