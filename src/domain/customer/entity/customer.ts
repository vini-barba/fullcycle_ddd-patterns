import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity implements CustomerInterface {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, _name: string) {
    super();
    this._id = id;
    this._name = _name;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "customer",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer",
      });
    }
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  get Address(): Address {
    return this._address;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
