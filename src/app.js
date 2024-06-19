import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebards", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.send("hi world");
});
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
