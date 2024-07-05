import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    index: true,
  },
  apellido: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  edad: {
    type: Number,
  },
  cursos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cursos",
    },
  ],
});

schema.pre("findOne", function (next) {
  this.populate("cursos");
  next();
});

const AlumnoModel = mongoose.model("alumnos", schema);
export default AlumnoModel;
