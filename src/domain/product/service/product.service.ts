import ProductInteface from "../entity/product";

export default class ProductService {
  static increasePrice(products: ProductInteface[], percentage: number): ProductInteface[] {
    products.forEach((product) => {
      product.changePrice(product.price * (1 + percentage / 100));
    });
    return products;
  }
}
