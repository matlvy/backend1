import express from "express";
import { engine } from "express-handlebars";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import "./database.js";
import mongoose from "mongoose";
import ProductModel from "./models/product.model.js";

const main = async () => {
  mongoose.connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/ecommerce"
  );
};

const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

import ProductManager from "./dao/fs/product-manager.js";
const productManager = new ProductManager("./src/models/productos.json");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se conecto");

  //Enviamos el array de productos:
  socket.emit("productos", await productManager.getProducts());

  //Recibimos el evento "eliminarProducto" desde el cliente:
  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);

    //Le voy a enviar la lista actualizada al cliente:
    io.sockets.emit("productos", await productManager.getProducts());
  });

  //Agregamos productos por medio de un formulario:
  socket.on("agregarProducto", async (producto) => {
    await productManager.addProduct(producto);
    //Le voy a enviar la lista actualizada al cliente:
    io.sockets.emit("productos", await productManager.getProducts());
  });
});

/*
const resultado = await ProductModel.aggregate([
  {
    $match: {
      status: true,
    },
  },
  {
    $group: {
      _id: "$category",
      total: {
        $sum: "$price",
      },
    },
  },
  {
    $sort: {
      total: 1,
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $group: { _id: 1, products: { $push: "$$ROOT" } } },
  { $project: { _id: 0, products: "$products" } },
  { $merge: { into: "reports" } },
]);
console.log(resultado);
*/

const resultado2 = await ProductModel.paginate({}, { limit: 3, page: 1 });
console.log(resultado2);

app.get("/products", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 2;

  try {
    const productsList = await ProductModel.paginate({}, { limit, page });

    let arrayProducts = productsList.docs.map((product) => {
      const { _id, ...rest } = product.toObject();
      return rest;
    });

    res.render("products", {
      products: arrayProducts,
      hasPrevPage: productsList.hasPrevPage,
      hasNextPage: productsList.hasNextPage,
      prevPage: productsList.prevPage,
      nextPage: productsList.nextPage,
      currentPage: productsList.page,
      totalPages: productsList.totalPages,
    });
  } catch (error) {
    console.log("error al solicitar los productos");
    res.status(500).send("Error en el servidor");
  }
});
