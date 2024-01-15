import products from "../../models/products.json" assert { type: "json" };

export default function (req, res, next) {
  const { limit = 10, page = 1 } = req.query;
  try {
    res.status(200);
    return res.json({
      limit,
      page,
      products: products.slice((page - 1) * limit, page * limit),
    });
  } catch (e) {
    next(e);
  }
}
