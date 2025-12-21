import express from "express";
import dotenv from "dotenv";
import ProductRouter from "./Routers/ProductRouters.js";
import errorhandlemiddleware from "./middleware/error.js";
import ConnectDB from "./config/db.js";
import UserRouter from "./Routers/UserRouter.js";

dotenv.config();
ConnectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded());
app.use(errorhandlemiddleware);
app.use("/api/v1", UserRouter);
app.use("/api/v1", ProductRouter);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default app;
