import orders from "#main/models/orders";
import discountCodes from "#main/models/discountCodes";
import discountPercent from "#main/info/discountPercent";

export default function (req, res, next) {
  const { orderId, discountCode } = req.body;

  try {
    if (!discountCode) return next();
    // Checking if this is nth order or not
    const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
    if (paidOrders.length % 10 !== 0)
      throw new Error("Discount code not available.");
    // Checking if discount code exists in database
    const validDiscountCode = discountCodes.find(
      (code) => code.id === discountCode
    );
    if (!validDiscountCode)
      throw new Error(`Invalid discount code ${discountCode}`);
    // Checking if discount code is used
    if (validDiscountCode.used)
      throw new Error(`Expired discount code${discountCode}`);

    req.discount = discountPercent;
    return next();
  } catch (e) {
    return next(e);
  }
}
