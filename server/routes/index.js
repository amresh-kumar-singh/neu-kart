import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("this got loogs");
  res.json({ message: "Hello World!!" });
});

export default router;
