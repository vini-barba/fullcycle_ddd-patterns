
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (transaction) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: transaction,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: transaction });
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        { where: { id: entity.id }, transaction: transaction }
      );
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id: id },
        include: [
          { model: OrderItemModel, include: [{ model: ProductModel }] },
          { model: CustomerModel },
        ],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    const order = this.buildOrderObjectFromModel(orderModel);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [
        { model: OrderItemModel, include: [{ model: ProductModel }] },
        { model: CustomerModel },
      ],
    });

    const orders = ordersModel.map((orderModel) =>
      this.buildOrderObjectFromModel(orderModel)
    );

    return orders;
  }

  private buildOrderObjectFromModel(orderModel: OrderModel) {
    const items: OrderItem[] = orderModel.items.map((itemModel) => {
      const item = new OrderItem(
        itemModel.id,
        itemModel.product.name,
        itemModel.product.price,
        itemModel.product.id,
        itemModel.quantity
      );
      return item;
    });

    const order = new Order(orderModel.id, orderModel.customer_id, items);
    return order;
  }
}
