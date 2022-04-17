import ProductInteface from "./product";

describe("Product unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new ProductInteface("", "product 1", 100);
    }).toThrowError("Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      const product = new ProductInteface("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("Should change name", () => {
    const product = new ProductInteface("123", "product 1", 100);
    const expectedName = "product 2";

    product.changeName(expectedName);

    expect(product.name).toBe(expectedName);
  });

  it("Should throw an error when change name to an empty name", () => {
    const product = new ProductInteface("123", "product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrowError("Name is required");
  });

  it("Should throw an error when price is less than zero", () => {
    expect(() => {
      const product = new ProductInteface("123", "product 1", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("Should change price", () => {
    const product = new ProductInteface("123", "product 1", 100);
    product.changePrice(150);

    expect(product.price).toBe(150);
  });

  it("Should throw an error when change price to an invalid value", () => {
    const product = new ProductInteface("123", "product 1", 100);
    expect(() => {
      product.changePrice(-1);
    }).toThrowError("Price must be greater than zero");
  });
});
