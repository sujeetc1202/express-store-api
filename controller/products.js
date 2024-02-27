const getAllProductsStatic = async (req, res) => {
  throw new Error("async error testing in setup");
  try {
    res.status(200).json({ msg: "products testing route" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports = { getAllProductsStatic, getAllProducts };
