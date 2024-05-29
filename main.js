const fs = require("fs");

const textoPromises = "./texto-pro.txt";

const operacionesAsincronicas = async () => {
  await fs.promises.writeFile(
    textoPromises,
    "nuevo archivo! trabajando con promesas"
  );

  let respuesta = await fs.promises.readFile(textoPromises, "utf-8");
  console.log(respuesta);

  await fs.promises.appendFile(textoPromises, " agregamos este texto");

  await fs.promises.unlink(textoPromises);
};
operacionesAsincronicas();

let products = [
  {
    name: "T-shirt",
    price: 15.99,
    category: "Apparel",
  },
  {
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
  },
  {
    name: "Book",
    price: 12.5,
    category: "Books",
  },
  {
    name: "Headphones",
    price: 49.99,
    category: "Electronics",
  },
];

console.log(products);

const productsfile = "./productsfile.json";
const savefile = async (array) => {
  await fs.promises.writeFile(productsfile, JSON.stringify(array, null, 2));
};

savefile(products);
const readFile = async () => {
  const answer = await fs.promises.readFile(productsfile, "utf-8");
  const newarrayofproducts = JSON.parse(answer);
  console.log(newarrayofproducts);
};
readFile();
