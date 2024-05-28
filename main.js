class ProductManager {
  static ultId = 0;
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, img, code, stock) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("todos los campos son obligatorios");
      return;
    }
    if (this.products.some((item) => item.code === code)) {
      console.log("el code debe ser unico");
      return;
    }
    const nuevoProducto = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };
    this.products.push(nuevoProducto);
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    const producto = this.products.find((item) => item.id === id);
    if (!producto) {
      console.log("not found");
    } else {
      console.log("el producto buscado es: ", producto);
    }
  }
}
const manager = new ProductManager();
console.log(manager.getProducts());

manager.addProduct(
  "producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

manager.addProduct(
  "producto prueba2",
  "este es un producto prueba2",
  400,
  "sin imagen",
  "abc1234",
  25
);
console.log(manager.getProducts());

manager.getProductById(1);
manager.getProductById(2);
manager.getProductById(3);
