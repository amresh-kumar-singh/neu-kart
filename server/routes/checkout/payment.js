import express from "express";
// import getProducts from "#main/controllers/products/getALL";
import payment from "#main/controllers/checkout/payment";
import validDiscount from "#main/middleware/validDiscount";
var router = express.Router();

router.post("/", validDiscount, payment);
// router.get("/:id", getProduct);

export default router;
