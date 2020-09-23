var inputA = undefined;
var inputB = undefined;

function start() {
  inputA = document.querySelector("#ainput");
  inputB = document.querySelector("#binput");

  startInputs();
  render();
}

function startInputs() {
  inputA.addEventListener("keyup", calculate);
  inputB.addEventListener("keyup", calculate);
}

function calculate() {
  if (inputA.value && inputB.value) {
    var parsedA = parseInt(inputA.value, 10);
    var parsedB = parseInt(inputB.value, 10);

    soma(parsedA, parsedB);
    subtracaoA(parsedA, parsedB);
    subtracaoB(parsedB, parsedA);
  }
}

function soma(a, b) {
  var result = document.querySelector("#rsoma");
  result.value = a + b;
}

function subtracaoA(a, b) {
  var result = document.querySelector("#rsubtracaoa");
  result.value = a - b;
}

function subtracaoB(b, a) {
  var result = document.querySelector("#rsubtracaob");
  result.value = b - a;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function render() {}

start();
