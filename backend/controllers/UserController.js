import Asyncerrorhandler from "../middleware/Asyncerrorhandler.js";
import User from "../models/Usermodel.js";

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
  res.status(201).json({ success: true, user });
});
