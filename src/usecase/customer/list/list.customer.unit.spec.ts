import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit test list customer use case", () => {
  const address0 = new Address("street 0", 124, "zip0", "city");
  const address1 = new Address("street 1", 125, "zip1", "city");

  const customer0 = CustomerFactory.createWithAddress("john", address0);
  const customer1 = CustomerFactory.createWithAddress("jane", address1);
  const customers = [customer0, customer1];

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockResolvedValue(customers),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should list customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer0.id);
    expect(output.customers[0].name).toBe(customer0.name);
    expect(output.customers[0].address.street).toBe(customer0.Address.street);

    expect(output.customers[1].id).toBe(customer1.id);
    expect(output.customers[1].name).toBe(customer1.name);
    expect(output.customers[1].address.street).toBe(customer1.Address.street);
  });
});
