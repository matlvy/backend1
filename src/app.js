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

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req2, file2, cb2) => {
    cb(null, "src/public/img");
  },
  filename: (req3, file3, cb3) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("uploaded");
});
