import { Router } from "express";
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

import ProductManager from "../controllers/product-manager.js";
const productManager = new ProductManager("./src/models/productos.json");

router.get("/", async (req, res) => {
  try {
    const productos = await productManager.getProducts();

    res.render("home", { productos });
  } catch (error) {
    res
      .status(500)
      .send("Error interno del servidor, va a llover todo el finde largo");
  }
});

export default router;
