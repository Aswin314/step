import express from "express";
import {
  CreateRegister,
  ForgotPassword,
  LoginUser,
  LogoutUser,
} from "../controllers/UserController.js";
const UserRouter = express.Router();
UserRouter.route("/register").post(CreateRegister);
UserRouter.route("/login").post(LoginUser);
UserRouter.route("/logout").post(LogoutUser);
UserRouter.route("/forgotpassword").post(ForgotPassword);
export default UserRouter;
