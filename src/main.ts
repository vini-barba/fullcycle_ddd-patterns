import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";

const customer = new Customer("123", "vini barba");
const address = new Address("Rua test", 42, "03099090", "São Paulo");
customer.Address = address;
customer.activate();

// const item1 = new OrderItem("1", "item 1", 10);
// const item2 = new OrderItem("2", "item 2", 15);

// const order = new Order("1", "123", [item1, item2]);
