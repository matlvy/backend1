import mongoose from "mongoose";
import UserModel from "./models/usuarios.model.js";

const main = async () => {
  mongoose.connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/Tienda"
  );
  const respuesta = await UserModel.find({ edad: { $lt: 19 } }).explain(
    "executionStats"
  );
  console.log(respuesta);
};
main();
