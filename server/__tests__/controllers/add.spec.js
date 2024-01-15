import addToCart from "#main/controllers/cart/add";
import ordersIdGenerator from "#main/utils/idGenerator/order";

jest.mock("../../models/products.json", () => [
  { id: "product1", title: "Product 1", price: 20 },
  { id: "product2", title: "Product 2", price: 30 },
]);
jest.mock("#main/models/orders");
jest.mock("#main/utils/idGenerator/order");

describe("addToCart", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      userId: "user123",
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn((x) => x),
    };
    next = jest.fn((x) => x);
  });

  it("should add a product to the user's cart", () => {
    req.body.productId = "product1";
    req.body.quantity = 2;

    ordersIdGenerator.mockReturnValue("ABC123");

    addToCart(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product added to cart",
      cart: {
        paymentStatus: "notPaid",
        id: "ABC123",
        userId: "user123",
        items: [
          { productId: "product1", quantity: 2, price: 20, name: "Product 1" },
        ],
      },
    });
  });

  it("should update quantity if the product is already in the cart", () => {
    req.body.productId = "product1";
    req.body.quantity = 3;

    addToCart(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product added to cart",
      cart: {
        paymentStatus: "notPaid",
        userId: "user123",
        id: "ABC123",
        items: [
          { productId: "product1", quantity: 3, price: 20, name: "Product 1" },
        ],
      },
    });
  });

  it("should remove the product if quantity is 0", () => {
    req.body.productId = "product1";
    req.body.quantity = 0;

    addToCart(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product added to cart",
      cart: {
        id: "ABC123",
        paymentStatus: "notPaid",
        userId: "user123",
        items: [],
      },
    });
  });

  it("should handle errors and call next", () => {
    req.body.productId = "nonExistentProduct";
    req.body.quantity = 2;

    addToCart(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
