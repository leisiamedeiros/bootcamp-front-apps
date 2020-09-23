var inputA = undefined;
var inputB = undefined;

function start() {
  inputA = document.querySelector("#ainput");
  inputB = document.querySelector("#binput");

  startInputs();
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
    multiplicacao(parsedA, parsedB);
    divisaoA(parsedA, parsedB);
    divisaoB(parsedB, parsedA);
    quadradoA(parsedA);
    quadradoB(parsedB);
    divisoresA(parsedA);
    divisoresB(parsedB);
    fatorialA(parsedA);
    fatorialB(parsedB);
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

function multiplicacao(a, b) {
  var result = document.querySelector("#rmultiplica");
  result.value = a * b;
}

function divisaoA(a, b) {
  var result = document.querySelector("#rdividea");
  result.value = b === 0 ? "Divisão por 0" : (a / b).toFixed(2);
}

function divisaoB(b, a) {
  var result = document.querySelector("#rdivideb");
  result.value = a === 0 ? "Divisão por 0" : (b / a).toFixed(2);
}

function quadradoA(a) {
  var result = document.querySelector("#rqua");
  result.value = a ** 2;
}

function quadradoB(b) {
  var result = document.querySelector("#rqub");
  result.value = b ** 2;
}

function divisoresA(a) {
  let divisores = [];
  for (let i = 1; i <= a; i++) {
    if (a % i == 0) {
      divisores.push(i);
    }
  }

  var result = document.querySelector("#divisoresa");
  result.value = divisores.join() + " (" + divisores.length + ")";
}

function divisoresB(b) {
  let divisores = [];
  for (let i = 1; i <= b; i++) {
    if (b % i == 0) {
      divisores.push(i);
    }
  }

  var result = document.querySelector("#divisoresb");
  result.value = divisores.join() + " (" + divisores.length + ")";
}

function fatorialA(a) {
  var result = document.querySelector("#fatoriala");
  if (a > 21) {
    result.value = "Número muito grande";
  } else {
    var fatorial = 1;
    for (let i = a; i > 1; i--) {
      fatorial *= i;
    }
    result.value = formatNumber(fatorial);
  }
}

function fatorialB(b) {
  var result = document.querySelector("#fatorialb");
  if (b > 21) {
    result.value = "Número muito grande";
  } else {
    var fatorial = 1;
    for (let i = b; i > 1; i--) {
      fatorial *= i;
    }
    result.value = formatNumber(fatorial);
  }
}

function formatNumber(number) {
  return new Intl.NumberFormat("pt-BR").format(number);
}

start();
