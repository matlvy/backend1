import express from "express";
import exphbs from "express-handlebars";
import multer from "multer";
import "./database.js";
import imagenRouter from "./routes/imagen.router.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).single("image"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", imagenRouter),
  app.listen(PUERTO, () => {
    console.log("listening at port", PUERTO);
  });
