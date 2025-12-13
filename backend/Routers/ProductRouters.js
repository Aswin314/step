import express from "express";
import {
  Createproduct,
  Deleteproduct,
  Getallproducts,
  Getoneproduct,
  Updateproduct,
} from "../controllers/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.route("/api/v1/products").get(Getallproducts).post(Createproduct);
ProductRouter.route("/api/v1/product").get(Getoneproduct);
ProductRouter.route("/api/v1/product/:id").put(Updateproduct);
ProductRouter.route("/api/v1/product/:id").delete(Deleteproduct);

export default ProductRouter;
