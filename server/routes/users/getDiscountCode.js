import express from "express";
import getDiscountCode from "#main/controllers/users/getDiscountCode";
var router = express.Router();

router.get("/", getDiscountCode);

export default router;
