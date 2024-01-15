import orders from "#main/models/orders";
import discountCodes from "#main/models/discountCodes";
import generateDiscountCode from "#main/utils/generateDiscountCode";
import discountAfterNOrder from "#main/info/discountAfterNOrder";

export default function (req, res, next) {
  try {
    // to generate discount code checing nth order
    const remainingOrderCountTillNextDiscount =
      orders.filter((order) => order.paymentStatus === "paid").length %
      discountAfterNOrder;

    if (remainingOrderCountTillNextDiscount === discountAfterNOrder - 1) {
      let responseObj;
      // check if last discount code is used or not, if not use create new
      if (
        discountCodes.length === 0 ||
        discountCodes.every((code) => code.used)
      ) {
        discountCodes.push({ id: generateDiscountCode(), used: false });
        res.status(201);
        responseObj = {
          message: "Discount code generated.",
          data: discountCodes[discountCodes.length - 1],
          isNew: true,
        };
      } else if (discountCodes.find((code) => !code.used)) {
        responseObj = {
          message: "Old discount code not used.",
          data: discountCodes[discountCodes.length - 1],
          isNew: false,
        };
      }
      res.status(responseObj.isNew ? 201 : 200);
      return res.json(responseObj);
    } else {
      throw new Error(
        `Can generate discount code after ${
          discountAfterNOrder - remainingOrderCountTillNextDiscount - 1
        } order.`
      );
    }
  } catch (e) {
    next(e);
  }
}
