console.log("checking if this works");

const socket = io();

socket.emit("message", "hi world, from client");

socket.on("greetings", (data) => {
  console.log(data);
});

socket.on("users", (data) => {
  const usersList = document.getElementById("usersList");
  data.forEach((user) => {
    usersList.innerHTML += `<li> ${user.name} ${user.surname} <li>`;
  });
});
