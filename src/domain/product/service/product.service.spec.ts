import ProductInteface from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit test", () => {
  it("Should change the price of all products", () => {
    const product1 = new ProductInteface("123", "product1", 10);
    const product2 = new ProductInteface("124", "product2", 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
