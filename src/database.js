import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/coderest"
  )
  .then(() => console.log("conectado a mongodb"))
  .catch((error) => console.log("tenemos un error", error));
