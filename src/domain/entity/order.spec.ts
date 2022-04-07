import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("Should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("Should throw error when no items are informed", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than zero");
  });

  it("Should calculate total", () => {
    const item1 = new OrderItem("1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 2);
    const order1 = new Order("123", "123", [item1]);
    const order2 = new Order("124", "123", [item1, item2]);

    expect(order1.total()).toBe(200);
    expect(order2.total()).toBe(600);
  });

  it("Should throw an error if quantity is less than one", () => {
    expect(() => {
      const item1 = new OrderItem("1", "item 1", 100, "p1", 0);
      const order1 = new Order("123", "123", [item1]);
    }).toThrowError("quantity must be greater than 0");
  });
});
