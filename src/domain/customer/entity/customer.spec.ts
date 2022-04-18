import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "vini");
    }).toThrow("customer: Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("customer: Name is required");
  });

  it("Should throw error when name and id are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("customer: Id is required,customer: Name is required");
  });

  it("Should change name", () => {
    const customer = new Customer("123", "john");
    const expectedName = "jane";

    customer.changeName(expectedName);

    expect(customer.name).toBe(expectedName);
  });

  it("Should throw an error when change name to a empty name", () => {
    const customer = new Customer("123", "john");
    expect(() => {
      customer.changeName("");
    }).toThrow("customer: Name is required");
  });

  it("Should activate user", () => {
    const customer = new Customer("123", "john");
    const address = new Address("Rua 1", 123, "030300303", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive).toBeTruthy();
  });

  it("Should throw an error when try to activate a user without an address", () => {
    const customer = new Customer("123", "john");

    expect(() => {
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("Should deactivate user", () => {
    const customer = new Customer("123", "john");

    customer.deactivate();

    expect(customer.isActive).toBeFalsy();
  });

  it("Should ass reward points", () => {
    const customer = new Customer("123", "john");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
