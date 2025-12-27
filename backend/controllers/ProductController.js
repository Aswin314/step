import Asyncerrorhandler from "../middleware/Asyncerrorhandler.js";
import Products from "../models/Productmodel.js";
import APIFunctionality from "../utils/APIFunctionality.js";
import HandleError from "../utils/handleerros.js";

const Createproduct = Asyncerrorhandler(async (req, res) => {
  req.body.user = req.user.id;
  const Product = await Products.create(req.body);
  console.log(Product);

  res.status(200).json({ success: true, Product });
});
const Getallproducts = Asyncerrorhandler(async (req, res) => {
  console.log(req.query);
  const resultpage = 3;
  const apifeature = new APIFunctionality(Products.find({}), req.query)
    .search()
    .filter();
  const filteredquery = apifeature.query.clone();
  const productcount = await filteredquery.countDocuments();
  const totalpage = Math.ceil(productcount / resultpage);
  const page = Number(req.query.page) || 1;

  if (page > totalpage && productcount > 0) {
    return next(new HandleError("this page is not exist", 404));
  }
  apifeature.pagination(resultpage);
  const Getallproducts = await apifeature.query;
  if (!Products || productcount === 0) {
    return next(new HandleError("no products found", 404));
  }
  res.status(200).json({ success: true, Getallproducts, productcount });
});
const Getoneproduct = Asyncerrorhandler(async (req, res, next) => {
  const productid = await Products.findById(req.params.id);
  if (!productid) {
    return next(new HandleError("product not found", 500));
  }
  res.status(200).json({ message: "all one product ", productid });
});
const Updateproduct = Asyncerrorhandler(async (req, res, next) => {
  const productid = await Products.findById(req.params.id);
  if (!productid) {
    return next(new HandleError("product not found", 500));
  }
  const updateproduct = await Products.findByIdAndUpdate(productid, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, updateproduct });
});
const Deleteproduct = Asyncerrorhandler(async (req, res) => {
  const { id } = req.params;
  const productid = await Products.findById(id);
  const Deletedid = await Products.findByIdAndDelete(productid);
  res.status(200).json({ message: `deleted ${Deletedid} item` });
});

export {
  Getallproducts,
  Getoneproduct,
  Createproduct,
  Updateproduct,
  Deleteproduct,
};
