import Address from "../value-object/address";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get Address(): Address;
  changeAddress(address: Address): void;
  changeName(name: string): void;
}
