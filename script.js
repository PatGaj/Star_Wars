import { rowData } from "./data.js";

const body = document.body;
// Nav
const nav = buildElement("nav");
const spanNav = buildElement("span", undefined, undefined, "To hear something type 'vader' or 'yoda'");
const themeButton = buildElement("button", "themeButton", undefined, "Light side");
themeButton.addEventListener("click", changeSide);
nav.append(spanNav, themeButton);

// Buttons
const divButtons = buildElement("div", "buttons");
for (const key in rowData) {
  const button = buildElement("button", key, undefined, key.toUpperCase());
  button.addEventListener("click", () => TestowaNazwaFunkcji(key));
  divButtons.appendChild(button);
}

// Content
const content = buildElement("div", "content");
// Logo
const logo = buildElement("img", "logo", undefined, undefined, "./img/star_wars.png");
content.appendChild(logo);

body.append(nav, divButtons, content);

// Sounds
const vaderSound = buildElement("audio", "vaderSound", undefined, undefined, "./mp3/sound-for-vader.mp3");
const yodaSound = buildElement("audio", "yodaSound", undefined, undefined, "./mp3/sound-for-yoda.mp3");
let typed = "";
const keywordVader = "vader";
const keywordYoda = "yoda";
document.addEventListener("keydown", function (event) {
  typed += event.key.toLowerCase();
  if (typed.includes(keywordVader)) {
    typed = "";
    vaderSound.play();
    if (yodaSound.currentTime !== 0) {
      yodaSound.pause();
      yodaSound.currentTime = 0;
    }
    setTimeout(() => {
      vaderSound.pause();
      vaderSound.currentTime = 0;
    }, 30000);
  } else if (typed.includes(keywordYoda)) {
    typed = "";
    yodaSound.play();
    if (vaderSound.currentTime !== 0) {
      vaderSound.pause();
      vaderSound.currentTime = 0;
    }
    setTimeout(() => {
      yodaSound.pause();
      yodaSound.currentTime = 0;
    }, 30000);
  }
  if (typed.length >= keywordVader.length) {
    typed = typed.substring(typed.length - (keywordVader.length - 1));
  }
});
body.append(vaderSound, yodaSound);
// Function
function changeSide() {
  const buttons = document.querySelectorAll("#buttons button");
  if (themeButton.textContent === "Light side") {
    themeButton.textContent = "Dark side";
    themeButton.style.backgroundColor = "var(--red)";
    body.style.backgroundImage = 'url("./img/vader_background.jpg")';
    buttons.forEach((button) => {
      button.style.boxShadow = "inset 0 -5px 10px 5px var(--red)";
      button.style.color = "var(--red)";
    });
  } else if (themeButton.textContent === "Dark side") {
    themeButton.textContent = "Light side";
    themeButton.style.backgroundColor = "var(--green)";
    body.style.backgroundImage = 'url("./img/falcon_background.jpg")';
    buttons.forEach((button) => {
      button.style.boxShadow = "inset 0 -5px 10px 5px var(--black)";
      button.style.color = "var(--black)";
    });
  }
}

function buildElement(typeElement, idElement, classElement, textElement, srcElement) {
  const element = document.createElement(typeElement);
  if (idElement !== undefined) {
    element.id = idElement;
  }
  if (classElement !== undefined) {
    element.class = classElement;
  }
  if (textElement !== undefined) {
    element.textContent = textElement;
  }
  if (srcElement !== undefined) {
    element.src = srcElement;
  }
  return element;
}

function TestowaNazwaFunkcji(category) {
  // Border tylko dla aktualnej
  const buttons = divButtons.children;
  for (const button of buttons) {
    button.style.border = "none";
  }
  const clickedButton = document.getElementById(category);
  clickedButton.style.border = "solid var(--green) 2px";
  content.removeChild(content.lastElementChild);
  // Tworzenie tabeli
  const table = buildElement("table");
  const tHead = buildElement("thead");
  const tBody = buildElement("tbody");
  table.append(tHead, tBody);
  const trHead = buildElement("tr");
  tHead.appendChild(trHead);
  const thIndex = buildElement("th", undefined, undefined, "ID");
  trHead.appendChild(thIndex);
  // dodawanie kolumn
  let colums;
  switch (category) {
    case "vehicles":
      colums = ["name", "model", "manufacturer", "created"];
      break;
    case "starships":
      colums = ["name", "model", "manufacturer", "created"];
      break;
    case "planets":
      colums = ["name", "climate", "terrain", "created"];
      break;
    case "people":
      colums = ["name", "birth_year", "gender", "created"];
      break;
    case "species":
      colums = ["name", "classification", "language", "created"];
      break;
    case "films":
      colums = ["title", "director", "release_date", "created"];
      break;
  }

  for (const dataName in rowData[category][0]) {
    if (colums.includes(dataName)) {
      const thColumn = buildElement("th", undefined, undefined, dataName);
      trHead.appendChild(thColumn);
    }
  }
  // dodanie kolumny Akcja
  const thAction = buildElement("th", undefined, undefined, "action");
  trHead.appendChild(thAction);
  // Content tabeli
  for (const index in rowData[category]) {
    //Index
    const trBody = buildElement("tr","trBody");
    tBody.appendChild(trBody);
    const tdIndex = buildElement("td", undefined, undefined, parseInt(index) + 1);
    trBody.appendChild(tdIndex);
    const row = rowData[category][index];
    // dodawanie wartości rkordów
    for (const dataName in row) {
      if (colums.includes(dataName)) {
        let record = row[dataName];
        if (dataName === "created") {
          record = record.slice(0,10);
        }
        const td = buildElement("td", undefined, undefined, record);
        trBody.appendChild(td);
      }
    }
    const tdAction = buildElement("td", "tdAction");
    const dleteButton = buildElement("button", "deleteButton", undefined, "X");
    const checkBoxRow = buildElement("input", "checkBoxRow");
    checkBoxRow.type = "checkbox";
    tdAction.append(dleteButton, checkBoxRow);
    trBody.appendChild(tdAction);
  }

  content.append(table);
}
