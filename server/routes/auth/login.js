import express from "express";
import login from "#main/controllers/auth/login";
var router = express.Router();

router.post("/", login);

export default router;
