import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Unit test update customer use case", () => {
  const address = new Address("Street", 123, "zip", "city");
  const customer = CustomerFactory.createWithAddress("john", address);
  const input = {
    id: customer.id,
    name: "john updated",
    address: {
      street: "street updated",
      number: 1234,
      zip: "zip updated",
      city: "city updated",
    },
  };

  const MockRepository = () => {
    return {
      find: jest.fn().mockResolvedValue(customer),
      findAll: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };
  };

  it("Should update a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});
