/*
const http = require("http");
const server = http.createServer((request, response) => {
  console.log("peticion al server");
  response.end("my first contact with the backend");
});
const PUERTO = 8080;
server.listen(PUERTO, () => {
  console.log("listening in port 8080");
});
*/

// EXPRESS:npm install express

const express = require("express");
const PUERTO = 8080;
const app = express();
app.get("/clientes", (req, res) => {
  res.send("first contact with express js");
});
app.listen(PUERTO, () => {
  console.log("listening to the port", PUERTO);
});
app.get("/store", (req, res) => {
  res.send("you have arrived to our store section");
});
app.get("/", (req, res) => {
  res.send("welcome to the coder store");
});

app.get("/cliente/:nombre", (req, res) => {
  let { nombre } = req.params;
  res.send("el nombre del cliente es " + nombre);
});

const products = [
  {
    name: "T-shirt",
    price: 15.99,
    category: "Apparel",
    id: 1,
  },
  {
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
    id: 2,
  },
  {
    name: "Book",
    price: 12.5,
    category: "Books",
    id: 3,
  },
  {
    name: "Headphones",
    price: 49.99,
    category: "Electronics",
    id: 4,
  },
];
app.get("/productos", (req, res) => {
  res.send(products);
});

app.get("/productos/:id", (req, res) => {
  let { id } = req.params;
  let productobuscado = products.find((product) => product.id == id);
  if (productobuscado) {
    res.send(productobuscado);
  } else {
    res.send("producto no encontrado");
  }
});

app.get("/usuarios", (req, res) => {
  let nombre = req.query.nombre;
  let apellido = req.query.apellido;
  res.send("welcome user " + nombre + " " + apellido);
});
