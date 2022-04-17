import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test list product use case", () => {
  const product0 = ProductFactory.create("a", "product 0", 10);
  const product1 = ProductFactory.create("a", "product 1", 20);
  const products = [product0, product1];
  const mockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockResolvedValue(products),
      update: jest.fn(),
    };
  };

  it("Should list products", async () => {
    const productRepository = mockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product0.id);
    expect(output.products[0].name).toBe(product0.name);
    expect(output.products[0].price).toBe(product0.price);
    expect(output.products[1].id).toBe(product1.id);
    expect(output.products[1].name).toBe(product1.name);
    expect(output.products[1].price).toBe(product1.price);
  });
});
