const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name price");
  // soting based on name and price if we add - before name then it will give in descending order
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  // to check query object is there or not
  //  in this way is query is present there in Schema it will send result if it is not there it will send all the data
  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const products = await await result;
  //   const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
