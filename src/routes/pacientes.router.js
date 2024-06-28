import { Router } from "express";
import pacientesModel from "../models/pacientes.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pacientes = await pacientesModel.find();
    console.log(pacientes);
    res.send(pacientes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const paciente = new pacientesModel(req.body);
    await paciente.save();
    res.status(201).send("Paciente registrado correctamente");
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const paciente = await pacientesModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    }
    res.status(200).send("Paciente modificado");
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const paciente = await pacientesModel.findByIdAndDelete(req.params.id);

    res.status(200).send("Se ha borrado un Paciente");
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

export default router;
