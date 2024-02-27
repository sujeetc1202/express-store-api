const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  // to check query object is there or not
  //  in this way is query is present there in Schema it will send result if it is not there it will send all the data
  const { featured } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // const products = await Product.find(req.query);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
