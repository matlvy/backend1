import mongoose from "mongoose";
import CursoModel from "./models/curso.model.js";
import AlumnoModel from "./models/alumno.model.js";

const main = async () => {
  mongoose.connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/Tienda"
  );
  /*
  const alumnos = await AlumnoModel.find();
  console.log(alumnos);
  const cursos = await CursoModel.find();
  console.log(cursos);
*/
  const estudiante = await AlumnoModel.findById("66875c6cb1312f0a388a4742");
  const cursoBackend = await CursoModel.findById("66875d0fb1312f0a388a4749");
  console.log(estudiante);
  console.log(cursoBackend);
  estudiante.cursos.push(cursoBackend);
  await AlumnoModel.findByIdAndUpdate(estudiante._id, estudiante);
  const estudianteConCurso = await AlumnoModel.findById(
    "66875c6cb1312f0a388a4742"
  );
  console.log(estudianteConCurso);
};
main();
