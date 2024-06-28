import mongoose from "mongoose";

const coleccion = "pacientes";
const pacienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
});
const pacientesModel = mongoose.model(coleccion, pacienteSchema);
export default pacientesModel;
