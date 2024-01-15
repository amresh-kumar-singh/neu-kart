import orders from "#main/models/orders";
import discountCodes from "#main/models/discountCodes";
import discountAfterNOrder from "#main/info/discountAfterNOrder";
discountAfterNOrder;

export default function (req, res, next) {
  try {
    // Filtring all sold orders
    const allSoldOrders = orders.filter(
      (order) => order.paymentStatus === "paid"
    );
    // if (!allSoldOrders.length) throw new Error("No sold order to fetch.");
    const soldProductsLists = allSoldOrders.reduce(
      (acc, item) => {
        //
        item.items.forEach((product) => {
          acc[product.productId] = {
            ...product,
            quantity:
              product.quantity + (acc[product.productId]?.quantity || 0),
          };
        });
        return { ...acc, total: item.total + acc.total };
      },
      { total: 0 }
    );

    const allDiscountsCodesWithTotalDiscount = discountCodes.reduce(
      (acc, code) => {
        return {
          ...acc,
          discountCodes: [...acc.discountCodes, code],
          total: acc.total + (code.totalDiscount || 0),
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
