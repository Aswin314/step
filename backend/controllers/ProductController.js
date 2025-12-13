import Products from "../models/Productmodel.js";

const Createproduct = async (req, res) => {
  const Product = await Products.create(req.body);
  console.log(Product);

  res.status(200).json({ success: true, Product });
};
const Getallproducts = (req, res) => {
  res.status(200).json({ message: "all products " });
};
const Getoneproduct = (req, res) => {
  res.status(200).json({ message: "all one product " });
};

export { Getallproducts, Getoneproduct, Createproduct };
