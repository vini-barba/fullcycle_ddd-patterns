import CreateCustomerUseCase from "./create.customer.usecase";

describe("Unit test create customer use case", () => {
  const input = {
    name: "john",
    address: {
      street: "street",
      number: 123,
      zip: "zip",
      city: "city",
    },
  };

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("Should throw an error when name is not provided", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);
    input.name = "";
    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("Should throw an error when address.street is not provided", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);
    input.address.street = "";
    await expect(usecase.execute(input)).rejects.toThrow("Street is required");
  });
});
