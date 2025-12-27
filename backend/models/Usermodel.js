import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    restPasswordExpire: Date,
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  if (!this.isModified("password")) {
    next();
  }
});
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.verifyPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
const User = mongoose.model("User", UserSchema);

export default User;
