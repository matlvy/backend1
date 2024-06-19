import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a client has connected");
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.emit("greetings", "hi client, how are you? i'm your server");
  socket.emit("users", users);
});
