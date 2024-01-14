import express from "express";
import getProducts from "#main/controllers/products/getALL";
import getProduct from "#main/controllers/products/getOne";
var router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
