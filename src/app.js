import express from "express";
const app = express();
const PORT = 8080;

import petsRouter from "./routes/pets.router.js";
import usersRouter from "./routes/users.router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("listening at the port:", PORT);
});

app.get("/", (req, res) => {
  res.send("welcome to the app");
});
app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);

app.use(express.static("./src/public"));
