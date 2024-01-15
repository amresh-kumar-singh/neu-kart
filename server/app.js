import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import log from "#main/utils/logs/index";

// Routes
import login from "#main/routes/auth/login";
import signup from "#main/routes/auth/signup";
import products from "#main/routes/products/getProducts";
import cart from "#main/routes/cart/index";
import checkout from "#main/routes/checkout/payment";
import admin from "#main/routes/admin/index";
import auth from "#main/middleware/auth/index";
import getDiscountCode from "#main/routes/users/getDiscountCode";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/login", login);
app.use("/signup", signup);
app.use("/products", auth, products);
app.use("/cart", auth, cart);
app.use("/checkout", auth, checkout);
app.use("/admin", auth, admin);
app.use("/getDiscountCode", getDiscountCode);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  log(err);
  console.log("ERROR: - ", err);
  if (err.name === "Error") {
    res.status(400);
    res.json({
      code: 400,
      error: err.message,
    });
  } else {
    res.status(err.status || 500);
    res.send("error");
  }
});

export default app;
