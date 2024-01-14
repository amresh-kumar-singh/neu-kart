import express from "express";
// import products from "../models/products.json" assert { type: "json" };
import signup from "#main/controllers/auth/signup";
var router = express.Router();

router.post("/", signup);

export default router;
