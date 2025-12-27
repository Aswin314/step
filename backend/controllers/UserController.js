import Asyncerrorhandler from "../middleware/Asyncerrorhandler.js";
import HandleError from "../utils/handleerros.js";
import User from "../models/Usermodel.js";
import { generateToken } from "../utils/jwtTokens.js";

export const CreateRegister = Asyncerrorhandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is temp id",
      url: "this is temp url",
    },
  });
  generateToken(user, 201, res);
});
export const LoginUser = Asyncerrorhandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("invalid email or password", 401));
  }
  const isPasswordMatched = await user.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new HandleError("invalid email or password", 401));
  }
  generateToken(user, 200, res);
});

export const LogoutUser = Asyncerrorhandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "logged out successfully" });
});
