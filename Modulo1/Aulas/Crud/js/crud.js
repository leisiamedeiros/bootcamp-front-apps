var inputName = undefined;
var names = [];
var isEditing = false;
var indexState = undefined;

function start() {
  inputName = document.querySelector("#inputName");

  preventFormEvent();
  startInput();
  render();
}

function preventFormEvent() {
  function preventFormEventDefault(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", preventFormEventDefault);
}

function render() {
  insertNodesOnNamesElement();
}

function insertNodesOnNamesElement() {
  var divNames = document.getElementById("names");
  divNames.innerHTML = "";

  var ul = document.createElement("ul");

  names.forEach((name, index) => {
    var li = document.createElement("li");

    var button = createDeleteButton(index);
    li.appendChild(button);

    var span = createSpanElement(name, index);
    li.appendChild(span);

    ul.appendChild(li);
  });

  divNames.appendChild(ul);
}

function createSpanElement(name, index) {
  function editValue() {
    isEditing = true;
    inputName.value = name;
    indexState = index;
    inputName.focus();
  }

  var span = document.createElement("span");
  span.textContent = name;
  span.classList.add("clickable");

  span.addEventListener("click", editValue);
  return span;
}

function createDeleteButton(index) {
  function removeFromList() {
    names.splice(index, 1);
    render();
  }

  var button = document.createElement("button");
  button.textContent = "x";

  button.addEventListener("click", removeFromList);

  return button;
}

function startInput() {
  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function insertName(name) {
  if (name !== "") names.push(name);
  render();
  clear();
}

function clear() {
  inputName.value = "";
}

function handleTyping(event) {
  if (event.key === "Enter") {
    if (isEditing) {
      names[indexState] = inputName.value;
      indexState = undefined;
      isEditing = false;
      clear();
      render();
    } else {
      insertName(event.target.value);
    }
  }
}

start();
