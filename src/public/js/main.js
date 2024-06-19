const socket = io();

let usuario;
const chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un usuario para identificarte en el Chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  usuario = result.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("mensaje", { usuario: usuario, mensaje: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("mensajesLogs", (data) => {
  const mensajesLogs = document.getElementById("mensajesLogs");

  let mensajes = "";

  data.forEach((mensaje) => {
    mensajes += `
                    <div class ="message">
                        <span class = "user" > ${mensaje.usuario} </span>
                        <div class = "text" > ${mensaje.mensaje} </div>
                    </div> `;
  });
  mensajesLogs.innerHTML = mensajes;
});
