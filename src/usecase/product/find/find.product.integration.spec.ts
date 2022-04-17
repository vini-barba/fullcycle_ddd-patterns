import { Sequelize } from "sequelize-typescript";
import ProductInteface from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const product = new ProductInteface("123", "product 1", 10);
    const input = { id: product.id };
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };
    await productRepository.create(product);

    const response = await usecase.execute(input);

    expect(response).toEqual(output);
  });
});
