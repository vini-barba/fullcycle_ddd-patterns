import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("Should create a Customer of type a", () => {
    const customer = CustomerFactory.create("Customer A");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBeUndefined();
  });

  it("Should create a customer with address", () => {
    const address = new Address("Rua", 1, "33333333", "São Paulo");
    const customer = CustomerFactory.createWithAddress("Customer A", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBe(address);
  });
});
