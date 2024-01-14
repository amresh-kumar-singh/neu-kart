import express from "express";
import getProducts from "#main/controllers/products/getALL";
import addToCart from "#main/controllers/cart/add";
var router = express.Router();

router.get("/", getProducts);
router.post("/add", addToCart);

export default router;
