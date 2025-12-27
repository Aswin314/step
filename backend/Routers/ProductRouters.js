import express from "express";
import {
  Createproduct,
  Deleteproduct,
  Getallproducts,
  Getoneproduct,
  Updateproduct,
} from "../controllers/ProductController.js";
import { rolebasedAccess, verifyuserAuth } from "../middleware/userAuth.js";

const ProductRouter = express.Router();

ProductRouter.route("/products")
  .get(verifyuserAuth, Getallproducts)
  .post(verifyuserAuth, rolebasedAccess("admin"), Createproduct);
ProductRouter.route("/product").get(verifyuserAuth, Getoneproduct);
ProductRouter.route("/product/:id").put(
  verifyuserAuth,
  rolebasedAccess("admin"),
  Updateproduct
);
ProductRouter.route("/product/:id").delete(
  verifyuserAuth,
  rolebasedAccess("admin"),
  Deleteproduct
);

export default ProductRouter;
