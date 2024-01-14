import products from "../../models/products.json" assert { type: "json" };
import orders from "#main/models/orders";
import discountCodes from "#main/models/discountCodes";
import generateDiscountCode from "#main/utils/generateDiscountCode";
import discountAfterNOrder from "#main/info/discountAfterNOrder";
discountAfterNOrder;
const n = 10;

export default function (req, res, next) {
  try {
    // Filtring all sold orders
    const allSoldOrders = orders.filter(
      (order) => order.paymentStatus === "paid"
    );
    if (!allSoldOrders.length) throw new Error("No sold order to fetch.");
    const soldProductsLists = allSoldOrders.reduce(
      (acc, item) => {
        //
        item.items.forEach((product) => {
          acc[product.productId] = [...(acc[product.productId] || []), product];
        });
        return { ...acc, total: item.total + acc.total };
      },
      { total: 0 }
    );

    const usedDiscountCodes = discountCodes.filter((code) => code.used);
    const allDiscountsCodesWithTotalDiscount = usedDiscountCodes.reduce(
      (acc, code) => {
        return {
          ...acc,
          [code.id]: code,
          total: acc.total + code.totalDiscount,
        };
      },
      { total: 0, discountCodes: [] }
    );

    res.status(200);
    return res.json({
      soldProductsLists,
      discountCodesAndTotal: allDiscountsCodesWithTotalDiscount,
    });
  } catch (e) {
    next(e);
  }
}
