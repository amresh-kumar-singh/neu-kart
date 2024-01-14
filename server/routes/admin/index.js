import express from "express";
import generateDiscountCode from "#main/controllers/admin/generateDiscountCode";
import soldProductAndDiscount from "#main/controllers/admin/soldProductAndDiscount";
var router = express.Router();

router.post("/generateDiscountCode", generateDiscountCode);
router.get("/soldProductAndDiscount", soldProductAndDiscount);

export default router;
