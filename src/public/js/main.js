const socket = io();

socket.on("productos", (data) => {
  renderProductos(data);
});

//Función para renderizar nuestros productos:

const renderProductos = (data) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");

    card.innerHTML = `  <p> ${item.title} </p>
                            <p> ${item.description} </p>
                            <p> ${item.price} </p>
                            <p> ${item.category} </p>
                            <button> Eliminar </button>
                        `;
    contenedorProductos.appendChild(card);
    //Agregamos un evento al boton de eliminar:
    card.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item.id);
    });
  });
};

const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
};

//Agregamos productos con el formulario:

document.getElementById("btnEnviar").addEventListener("click", () => {
  agregarProducto();
});

const agregarProducto = () => {
  const producto = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("agregarProducto", producto);
};
