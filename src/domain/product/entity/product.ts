import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string = "";
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "product",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "product",
      });
    }

    if (this._price <= 0) {
      this.notification.addError({
        message: "Price must be greater than zero",
        context: "product",
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

  get name(): string {
    return this._name;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }
}
