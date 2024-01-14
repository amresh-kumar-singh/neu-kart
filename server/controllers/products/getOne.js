import products from "../../models/products.json" assert { type: "json" };

export default function (req, res, next) {
  const { id } = req.params;
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);
  try {
    if (product) {
      res.status(200);
      return res.json({
        _id: productId,
        product,
      });
    } else {
      throw new Error(`Product with id ${id} does not exists.`);
    }
  } catch (e) {
    next(e);
  }
}
