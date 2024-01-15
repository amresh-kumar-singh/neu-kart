import express from "express";
import signup from "#main/controllers/auth/signup";
var router = express.Router();

router.post("/", signup);

export default router;
