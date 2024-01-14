import products from "../../models/products.json" assert { type: "json" };

export default function (req, res, next) {
  const { limit = 10, page = 1 } = req.query;
  try {
    const product = products.slice((page - 1) * limit, page * limit);
    if (!product.length) throw new Error("No more products to show.");
    res.status(200);
    return res.json({
      limit: 10,
      products: product,
    });
  } catch (e) {
    next(e);
  }
}
