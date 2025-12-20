import express from "express";
import { CreateRegister } from "../controllers/UserController.js";
const UserRouter = express.Router();
UserRouter.route("/register").post(CreateRegister);
export default UserRouter;
