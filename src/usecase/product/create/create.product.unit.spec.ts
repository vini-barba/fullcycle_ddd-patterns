import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create product use case", () => {
  const input = { name: "product 0", price: 100 };
  const product = ProductFactory.create("a", input.name, input.price);

  const mockRepository = () => {
    return {
      create: jest.fn().mockResolvedValue({
        id: product.id,
        name: product.name,
        price: product.price,
      }),
      find: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should create a product", async () => {
    const productRepository = mockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
