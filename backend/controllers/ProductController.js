import Products from "../models/Productmodel.js";

const Createproduct = async (req, res) => {
  const Product = await Products.create(req.body);
  console.log(Product);

  res.status(200).json({ success: true, Product });
};
const Getallproducts = async (req, res) => {
  const Getallproducts = await Products.find({});
  res.status(200).json({ success: true, Getallproducts });
};
const Getoneproduct = (req, res) => {
  res.status(200).json({ message: "all one product " });
};
const Updateproduct = async (req, res) => {
  const productid = await Products.findById(req.params.id);
  if (!productid) {
    res.status(500).json({ success: false, message: "product not found " });
  }
  const updateproduct = await Products.findByIdAndUpdate(productid, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, updateproduct });
};
const Deleteproduct = async (req, res) => {
  const { id } = req.params;
  const productid = await Products.findById(id);
  const Deletedid = await Products.findByIdAndDelete(productid);
  res.status(200).json({ message: `deleted ${Deletedid} item` });
};

export {
  Getallproducts,
  Getoneproduct,
  Createproduct,
  Updateproduct,
  Deleteproduct,
};
