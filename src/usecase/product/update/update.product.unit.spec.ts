import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
  const product = ProductFactory.create("a", "product 0", 10);
  const input = {
    id: product.id,
    name: "product 0 updated",
    price: 100,
  };

  const mockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockResolvedValue(product),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };
  it("Should create a product", async () => {
    const productRepository = mockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
