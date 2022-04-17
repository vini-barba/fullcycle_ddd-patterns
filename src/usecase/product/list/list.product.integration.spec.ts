import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("integration test list product use case", () => {
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

  it("Should list products", async () => {
    const product0 = ProductFactory.create("a", "product 0", 10);
    const product1 = ProductFactory.create("a", "product 1", 20);
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    productRepository.create(product0);
    productRepository.create(product1);

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
