import orders from "#main/models/orders";
import products from "../../models/products.json" assert { type: "json" };
import ordersIdGenerator from "#main/utils/idGenerator/order";

export default function (req, res, next) {
  const { productId, quantity } = req.body;
  try {
    // Find the product in the products array
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found.`);
    }
    const { userId } = req;

    //   Checking if user already have items in cart
    const currentUserPreviousCartIndex = orders.findIndex(
      (order) => order.paymentStatus === "notPaid" && order.userId === userId
    );

    if (currentUserPreviousCartIndex >= 0) {
      const previousOrderInCart = orders[currentUserPreviousCartIndex];
      // checking if product already exits in user's cart
      const itemAlreadyIncartIndex = previousOrderInCart.items.findIndex(
        (product) => product.productId === productId
      );
      if (itemAlreadyIncartIndex >= 0) {
        // Product already exits in users cart then then updating quantity
        previousOrderInCart.items[itemAlreadyIncartIndex] = {
          ...previousOrderInCart.items[itemAlreadyIncartIndex],
          quantity,
        };
      } else {
        // Product does not exits in users cart then adding
        previousOrderInCart.items.push({
          productId,
          quantity,
          price: product.price,
        });
      }
    } else {
      // No prodcut in users cart then adding it to orders collection with payment status notPaid
      const order = {
        id: ordersIdGenerator(),
        paymentStatus: "notPaid",
        userId,
        items: [{ productId, quantity, price: product.price }],
      };
      orders.push(order);
    }
    const cart = orders.find(
      (order) => order.paymentStatus === "notPaid" && order.userId === userId
    );
    res.status(201);
    return res.json({ message: "Product added to cart", cart });
  } catch (e) {
    next(e);
  }
}
