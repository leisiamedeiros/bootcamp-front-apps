let devs = [];
let devsFiltered = [];

let qtdTotalDevs = 0;
let qtdDevsFounded = 0;

let searchInputValue = "";
let checkboxSelected = ["Java", "JavaScript", "Python"];
let radioValue = "or";

function start() {
  addEventToInputs();
  getDevs().then(render);
}

function addEventToInputs() {
  let searchInput = document.querySelector("#search");
  searchInput.addEventListener("keyup", handleInputSearch);

  let checkboxJscript = document.querySelector("#checkjs");
  checkboxJscript.addEventListener("change", handleCheckBox);

  let checkboxJava = document.querySelector("#checkjava");
  checkboxJava.addEventListener("change", handleCheckBox);

  let checkboxPython = document.querySelector("#checkpython");
  checkboxPython.addEventListener("change", handleCheckBox);

  let radioAnd = document.querySelector("#radioAnd");
  radioAnd.addEventListener("change", handleCheckBox);

  let radioOr = document.querySelector("#radioOr");
  radioOr.addEventListener("change", handleCheckBox);
}

async function getDevs() {
  const result = await (await fetch("http://localhost:3001/devs")).json();

  devs = result.map((dev) => {
    const { id, name, picture, programmingLanguages } = dev;

    return {
      id,
      name,
      picture,
      languages: programmingLanguages.map((langs) => langs.language),
      sligifiedName: slugify(name),
    };
  });

  devsFiltered = devs;
}

function slugify(str) {
  const mapChars = {
    a: "á|à|ã|â|À|Á|Ã|Â",
    e: "é|è|ê|É|È|Ê",
    i: "í|ì|î|Í|Ì|Î",
    o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
    u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
    c: "ç|Ç",
    n: "ñ|Ñ",
  };

  for (let pattern in mapChars) {
    str = str.replace(new RegExp(mapChars[pattern], "g"), pattern);
  }

  return str.toLowerCase().replaceAll(/ /gi, "");
}

function render() {
  let divDevs = document.querySelector("#devs");
  divDevs.innerHTML = "";

  let spanQtdDevs = document.querySelector("#qtdDevs");
  spanQtdDevs.textContent = devsFiltered.length;

  devsFiltered.forEach((dev) => {
    divDevs.appendChild(createCards(dev));
  });
}

function createCards(dev) {
  let divCard = document.createElement("div");
  divCard.className = "card-dev";

  let devPhoto = document.createElement("img");
  devPhoto.className = "img-face-dev";
  devPhoto.src = dev.picture;

  let nameDev = document.createElement("span");
  nameDev.textContent = dev.name;

  divCard.appendChild(devPhoto);
  divCard.appendChild(nameDev);

  dev.languages.forEach((language) => {
    let imgLanguage = document.createElement("img");
    imgLanguage.src = getImgLanguageSource(language);

    divCard.appendChild(imgLanguage);
  });

  return divCard;
}

function getImgLanguageSource(language) {
  switch (language) {
    case "Java":
      return "./img/java.png";

    case "JavaScript":
      return "./img/javascript.png";

    default:
      return "./img/python.png";
  }
}

function handleInputSearch({ target }) {
  searchInputValue = slugify(target.value);

  filterDevs();
}

function handleCheckBox({ target }) {
  const { checked, name, value } = target;

  // get only radio values
  if (value !== "on") {
    radioValue = value;
  }

  // if no radio name it is ckeckbox element
  if (name !== "andOr") {
    const index = checkboxSelected.findIndex((elName) => elName === name);
    if (index === -1) {
      checkboxSelected.push(name);
    }

    if (!checked) {
      checkboxSelected.splice(index, 1);
    }
  }

  filterDevs();
}

function filterDevs() {
  devsFiltered =
    radioValue === "or"
      ? devs.filter((dev) => {
          return dev.languages.some((lang) => checkboxSelected.includes(lang));
        })
      : devs.filter(
          (dev) => dev.languages.join("") === checkboxSelected.join("")
        );

  if (searchInputValue !== "") {
    devsFiltered = devsFiltered.filter((dev) => {
      return dev.sligifiedName.includes(searchInputValue);
    });
  }

  render();
}

start();
