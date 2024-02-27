const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("name").select("name price");
  // .limit(10) // used to limit the list size
  // .skip(5); // used to skip from the list
  // soting based on name and price if we add - before name then it will give in descending order
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  // to check query object is there or not
  //  in this way is query is present there in Schema it will send result if it is not there it will send all the data
  const { featured, company, name, sort, fields } = req.query;
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
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  // select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  // limit
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  // updating the result as per limit/pagination
  result = result.skip(skip).limit(limit);

  const products = await result;
  //   const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
