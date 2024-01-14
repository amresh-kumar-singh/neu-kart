import orders from "#main/models/orders";
import products from "../../models/products.json" assert { type: "json" };
import getTotalPriceFromItemsArr from "#main/utils/checkout/getTotalPriceFromItemsArr";
import discountCodes from "#main/models/discountCodes";

export default function (req, res, next) {
  const { orderId, discountCode } = req.body;
  const { discount = 0 } = req;
  // TODO add check for

  try {
    if (orderId) {
      const orderIndex = orders.findIndex((order) => orderId === order.id);
      if (orderIndex >= 0) {
        const order = orders[orderIndex];
        if (order.paymentStatus === "paid")
          throw new Error(`Order with order id ${orderId} is already placed.`);
        const total = getTotalPriceFromItemsArr(order.items);
        const discountAmount = (total * discount) / 100;
        order.paymentStatus = "paid";
        order.total = Math.ceil(total - discountAmount);
        // Updating discount's collection
        if (discount) {
          const currentDiscountCodeIndex = discountCodes.findIndex(
            (discount) => discount.id === discountCode
          );
          discountCodes[currentDiscountCodeIndex] = {
            ...discountCodes[currentDiscountCodeIndex],
            used: true,
            totalDiscount: discountAmount,
          };
        }
        res.status(200);
        return res.json({
          order,
        });
      } else {
        throw new Error(`No order found with order id ${orderId}.`);
      }
    }
    throw new Error("insufficient data");
  } catch (e) {
    next(e);
  }
}
