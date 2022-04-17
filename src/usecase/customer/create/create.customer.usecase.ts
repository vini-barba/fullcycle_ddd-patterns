import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";
import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  public async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    );

    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.customerRepository.create(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}
