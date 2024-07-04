import { Router } from "express";
import { promises as fs } from "fs";
import ImagenModel from "../models/imagen.model.js";
const router = Router();

router.get("/", async (req, res) => {
  const imagenes = await ImagenModel.find().lean();
  res.render("index", { imagenes: imagenes });
});
router.get("/upload", (req, res) => {
  res.render("upload");
});
router.post("/upload", async (req, res) => {
  try {
    const imagen = new ImagenModel();
    imagen.title = req.body.title;
    imagen.description = req.body.description;
    imagen.filename = req.file.filename;
    imagen.path = "/img/" + req.file.filename;

    await imagen.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;
  const imagen = await ImagenModel.findByIdAndDelete(id);
  await fs.unlink("./src/public" + imagen.path);
  res.redirect("/");
});

export default router;
