function start() {
  console.log("carregado!");

  var input = document.querySelector("#inputName");
  input.addEventListener("keyup", countChars);

  var form = document.querySelector("form");
  form.addEventListener("submit", manipularDados);
}

function countChars(event) {
  var values = event.target.value;

  var spanvalores = document.querySelector("#spanValores");
  spanvalores.textContent = values.length;
}

function manipularDados(event) {
  event.preventDefault();

  var input = document.querySelector("#inputName");
  alert(input.value + " recebido!");
}

start();
