import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name "],
      maxlength: [15, "name is full "],
      minlength: [3, "name is too short"],
    },
    email: {
      type: String,
      required: [true, "email is needed"],
      unique: true,
      validate: [validator.isEmail, "enter your valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password "],
      maxlength: [15, "password is full "],
      minlength: [3, "password is too short"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.verifyPassword = async function (enteredpassword) {
  return await bcryptjs.compare(enteredpassword, this.password);
};
UserSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  return resetToken;
};
// backward-compatible alias for existing calls
UserSchema.methods.generatepasswordresttoken =
  UserSchema.methods.generatePasswordResetToken;
const User = mongoose.model("User", UserSchema);

export default User;
