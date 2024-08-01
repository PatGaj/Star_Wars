import { rowData } from "./data.js";

const body = document.body;
// Nav
const nav = document.createElement("nav");
const spanNav = document.createElement("span");
spanNav.textContent = `To see something interesting type "vader" or "yoda"`;
const themeButton = document.createElement("button");
themeButton.textContent = "Light side";
themeButton.id = "themeButton";
themeButton.addEventListener("click", changeSide);
nav.append(spanNav, themeButton);
// Buttons
const divButtons = document.createElement("div");
divButtons.id = "buttons";
const tablesData = {};
for (const key in rowData) {
  tablesData.key = undefined;
  const button = document.createElement("button");
  button.id = key;
  button.addEventListener("click", () => TestowaNazwa(key));
  button.textContent = key.toUpperCase();
  divButtons.appendChild(button);
}

// Wyciąganie danych
// const category = "species";
//
// for (const index in rowData[category]) {
//   //Index
//   const row = rowData[category][index];
//   for (const dataName in row) {
//     //dataName - nazwa kolukmny
//     //row[dataName] - wartość wiersza w kolumnie
//   }
// }

// Tabela

// TEST DODAWANIA REKORDÓW
function TestowaNazwa(category) {
  content.removeChild(content.lastElementChild);
  const table = document.createElement("table");
  const tHead = document.createElement("thead");
  const tBody = document.createElement("tbody");
  table.append(tHead, tBody);
  const trHead = document.createElement("tr");
  tHead.appendChild(trHead);
  const thIndex = document.createElement("th");
  thIndex.textContent = "ID";
  trHead.appendChild(thIndex);
  // Heading tabeli
  let counter = 0;
  for (const dataName in rowData[category][0]) {
    if (skipColun(dataName, "episode_id", "opening_crawl")) {
      continue;
    }
    const thColumn = document.createElement("th");
    thColumn.textContent = dataName;
    trHead.appendChild(thColumn);

    counter += 1;
    if (counter === 3) {
      counter = 0;
      break;
    }
  }
  const thAction = document.createElement("th");
  thAction.textContent = "Action";
  trHead.appendChild(thAction);
  // Content tabeli
  for (const index in rowData[category]) {
    //Index
    const trBody = document.createElement("tr");
    tBody.appendChild(trBody);
    const tdIndex = document.createElement("td");
    tdIndex.textContent = parseInt(index) + 1;
    trBody.appendChild(tdIndex);
    const row = rowData[category][index];
    for (const dataName in row) {
      if (skipColun(dataName, "episode_id", "opening_crawl")) {
        continue;
      }
      // if (dataName === "episode_id" || dataName === "opening_crawl") {
      //   continue;
      // }
      const td = document.createElement("td");
      td.textContent = row[dataName];
      trBody.appendChild(td);
      counter += 1;
      if (counter === 3) {
        counter = 0;
        break;
      }
    }
  }
  content.append(table);
}

// Skip Func
function skipColun(currentColumn, ...unwantedColumns) {
  const tab = [...unwantedColumns];
  if (tab.includes(currentColumn)) {
    return true;
  }
  return false;
}
// Content
const content = document.createElement("div");
content.id = "content";
// Logo
const logo = document.createElement("img");
logo.id = "logo";
logo.src = ".\\img\\star_wars.png";
content.appendChild(logo);
// Vader
const vader = document.createElement("img");
vader.id = "vader";
vader.src = ".\\img\\vader.png";
// Yoda
const yoda = document.createElement("img");
yoda.id = "yoda";
yoda.src = ".\\img\\yoda.png";

body.append(nav, divButtons, content, vader, yoda);

// Sound and Effect
const vaderSound = document.createElement("audio");
vaderSound.id = "vaderSound";
vaderSound.src = ".\\mp3\\sound-for-vader.mp3";
const yodaSound = document.createElement("audio");
yodaSound.id = "yodaSound";
yodaSound.src = ".\\mp3\\sound-for-yoda.mp3";
let typed = "";
const keywordVader = "vader";
const keywordYoda = "yoda";
const vaderSoundTime = 39000;
const yodaSoundTime = 26000;
const vaderDelay = 8000;
const yodaDelay = 7000;
yoda.style.animation = `appearance ${(yodaSoundTime - yodaDelay) / 1000}s linear`;
vader.style.animation = `appearance ${(vaderSoundTime - vaderDelay) / 1000}s linear`;
document.addEventListener("keydown", function (event) {
  typed += event.key.toLowerCase();
  if (typed.includes(keywordVader)) {
    typed = "";
    vaderSound.play();
    yodaSound.pause();
    yodaSound.currentTime = 0;
    yoda.style.display = "none";
    setTimeout(() => {
      vader.style.display = "block";
    }, vaderDelay);
    setTimeout(() => {
      vader.style.display = "none";
      vaderSound.pause();
      vaderSound.currentTime = 0;
    }, vaderSoundTime);
  } else if (typed.includes(keywordYoda)) {
    typed = "";
    yodaSound.play();
    vaderSound.pause();
    vaderSound.currentTime = 0;
    vader.style.display = "none";
    setTimeout(() => {
      yoda.style.display = "block";
    }, yodaDelay);
    setTimeout(() => {
      yoda.style.display = "none";
      yodaSound.pause();
      yodaSound.currentTime = 0;
    }, yodaSoundTime);
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
