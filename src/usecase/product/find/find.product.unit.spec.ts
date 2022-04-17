import ProductInteface from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find product use case", () => {
  const product = new ProductInteface("123", "product 1", 10);

  const mockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockResolvedValue(product),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should find a product", async () => {
    const productRepository = mockRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input = { id: product.id };
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };
    const response = await usecase.execute(input);

    expect(response).toEqual(output);
  });
});
