import discountCodes from "#main/models/discountCodes";
import discountAfterNOrder from "#main/info/discountAfterNOrder";
import orders from "#main/models/orders";

export default function (req, res, next) {
  try {
    const currentOrderNo =
      orders.filter((order) => order.paymentStatus === "paid").length %
      discountAfterNOrder;

    if (currentOrderNo !== discountAfterNOrder - 1)
      throw new Error("Discount code not available on this order!");

    // Checking if discount code exists in database
    const validDiscountCode = discountCodes.find((code) => !code.used);
    if (!validDiscountCode) throw new Error("No discount code available!");
    res.status(200);
    return res.json({
      data: validDiscountCode,
    });
  } catch (e) {
    next(e);
  }
}
