import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "street",
          number: 123,
          zip: "zip",
          city: "city",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("street");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("zip");
    expect(response.body.address.city).toBe("city");
  });

  it("Should not create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John",
    });
    expect(response.status).toBe(500);
  });

  it("Should list all customers", async () => {
    await request(app)
      .post("/customers")
      .send({
        name: "Jane",
        address: {
          street: "street",
          number: 124,
          zip: "zip",
          city: "city",
        },
      });
    await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "street",
          number: 123,
          zip: "zip",
          city: "city",
        },
      });

    const response = await request(app).get("/customers");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe("Jane");
    expect(response.body.customers[0].address.number).toBe(124);
    expect(response.body.customers[1].name).toBe("John");
    expect(response.body.customers[1].address.number).toBe(123);
  });

  it("Should find a customer", async () => {
    const customerCreated = await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "street",
          number: 123,
          zip: "zip",
          city: "city",
        },
      });
    const customer = customerCreated.body;

    const response = await request(app).get(`/customers/${customer.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(customer.name);
    expect(response.body.address.street).toBe(customer.address.street);
    expect(response.body.address.number).toBe(customer.address.number);
    expect(response.body.address.zip).toBe(customer.address.zip);
    expect(response.body.address.city).toBe(customer.address.city);
  });
});
