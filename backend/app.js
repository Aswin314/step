import express from "express";
import dotenv from "dotenv";
import ProductRouter from "./Routers/ProductRouters.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use("/", ProductRouter);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default app;
