import express from "express";
import { Createproduct, Getallproducts, Getoneproduct } from "../controllers/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.route("/api/v1/products").get(Getallproducts).post(Createproduct);
ProductRouter.route("/api/v1/product").get(Getoneproduct);

export default ProductRouter;
