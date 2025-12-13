const Getallproducts = (req, res) => {
  res.status(200).json({ message: "all products " });
};
const Getoneproduct = (req, res) => {
  res.status(200).json({ message: "all one product " });
};

export {Getallproducts,Getoneproduct}
