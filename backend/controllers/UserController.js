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

export const ForgotPassword = Asyncerrorhandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new HandleError("User not found", 404);

  // generate token (ensure this name matches your model method)
  const resetToken = user.generatePasswordResetToken();

  try {
    await User.findByIdAndUpdate(
      user._id,
      {
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpire: user.resetPasswordExpire,
      },
      { new: true, runValidators: false }
    );
  } catch (err) {
    console.error("update() failed:", err);
    throw new HandleError(
      "could not save reset token: " + (err.message || err),
      500
    );
  }
  const resetpasswordurl = `http://localhost:5000/password/reset/${resetToken}`;
  console.log(resetpasswordurl);
  const message = `your password reset token is :- \n\n ${resetpasswordurl} \n\n if you have not requested this email then please ignore it.`;
  try {
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new HandleError(err.message, 500);
  }
});
