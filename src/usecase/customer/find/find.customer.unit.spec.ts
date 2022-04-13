import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer";

describe("Unit test find customer use case", () => {
  const customer = new Customer("123", "john");
  const address = new Address("street", 123, "zip", "city");
  customer.changeAddress(address);

  const MockRepository = () => {
    return {
      find: jest.fn().mockResolvedValue(customer),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = { id: "123" };
    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        city: address.city,
        number: address.number,
        zip: address.zip,
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("Should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = { id: "123" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
