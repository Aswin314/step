import express from "express";
import {
  CreateRegister,
  LoginUser,
  LogoutUser,
} from "../controllers/UserController.js";
const UserRouter = express.Router();
UserRouter.route("/register").post(CreateRegister);
UserRouter.route("/login").post(LoginUser);
UserRouter.route("/logout").post(LogoutUser);
export default UserRouter;
