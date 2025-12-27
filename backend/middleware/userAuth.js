import User from "../models/Usermodel.js";
import HandleError from "../utils/handleerros.js";
import Asyncerrorhandler from "./Asyncerrorhandler.js";
import jwt from "jsonwebtoken";

export const verifyuserAuth = Asyncerrorhandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new HandleError("please login to access this resource", 401));
  }
  const decodeddata = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodeddata);
  req.user = await User.findById(decodeddata.id);
  next();
});
export const rolebasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new HandleError(
        "you are not allowed to access this resource",
        403
      );
    }
    next();
  };
};
