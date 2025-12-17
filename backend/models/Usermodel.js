import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
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
});
