import products from "../../models/products.json" assert { type: "json" };
import orders from "#main/models/orders";
import discountCodes from "#main/models/discountCodes";
import generateDiscountCode from "#main/utils/generateDiscountCode";
import discountAfterNOrder from "#main/info/discountAfterNOrder";
discountAfterNOrder;
const n = 10;

export default function (req, res, next) {
  try {
    // Check if nth order or not
    const remainingOrderCountTillNextDiscount = orders.length % 10;
    if (remainingOrderCountTillNextDiscount === 0) {
      // check if last discount code is used or not
      if (
        !discountCodes.length ||
        discountCodes[discountCodes.length - 1].used
      ) {
        discountCodes.push({ id: generateDiscountCode(), used: false });
        res.status(201);
        return res.json({
          message: "Discount code generated.",
          data: discountCodes[discountCodes.length - 1],
        });
      }
      throw new Error("Prevous discount code is not used.");
    } else {
      throw new Error(
        `Can generate discount code after ${
          discountAfterNOrder - remainingOrderCountTillNextDiscount
        } order.`
      );
    }
  } catch (e) {
    next(e);
  }
}
