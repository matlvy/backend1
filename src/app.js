import express from "express";
import mongoose from "mongoose";
import pacientesRouter from "./routes/pacientes.router.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pacientes", pacientesRouter);

app.listen(PUERTO, () => {
  console.log("listening at the port");
});

mongoose
  .connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/clinica"
  )
  .then(() => console.log("connected to the database"))
  .catch((error) => console.log("we got an error connecting", error));
