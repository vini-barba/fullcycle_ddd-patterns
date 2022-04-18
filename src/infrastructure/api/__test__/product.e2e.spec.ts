import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "product 1",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("product 1");
    expect(response.body.price).toBe(100);
  });

  it("Should not create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "product 1",
    });
    expect(response.status).toBe(500);
  });

  it("Should list all products", async () => {
    await request(app).post("/products").send({
      name: "product 1",
      price: 100,
    });
    await request(app).post("/products").send({
      name: "product 2",
      price: 200,
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].name).toBe("product 1");
    expect(response.body.products[0].price).toBe(100);
    expect(response.body.products[1].name).toBe("product 2");
    expect(response.body.products[1].price).toBe(200);
  });

  it("Should find a product", async () => {
    const productCreated = await request(app).post("/products").send({
      name: "product 3",
      price: 100,
    });

    const product = productCreated.body;

    const response = await request(app).get(`/products/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name);
    expect(response.body.price).toBe(product.price);
  });
});
