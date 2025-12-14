import HandleError from "../utils/handleerros.js";

export default (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "internal server error";

  if (err.name === "casterror") {
    const message = `this is invaild resources ${err.path}`;
    err = new HandleError(message, 404);
  }
  res.status(err.statuscode).json({ success: false, message: err.message });
};
