import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Item qtd must be greater than zero");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("quantity must be greater than 0");
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public set items(items: OrderItem[]) {
    this._items = items;
  }
}
