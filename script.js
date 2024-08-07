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
  button.addEventListener("click", () => createTableWitchData(key));
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
body.append(vaderSound, yodaSound);

let typed = "";
const keywordVader = "vader";
const keywordYoda = "yoda";
document.addEventListener("keydown", function (event) {
  typed += event.key.toLowerCase();
  console.log(typed);

  if (typed.includes(keywordVader)) {
    typed = "";
    soundStartStop(vaderSound, 30);
    if (yodaSound.currentTime !== 0) {
      soundStop(yodaSound);
    }
  } else if (typed.includes(keywordYoda)) {
    typed = "";
    soundStartStop(yodaSound, 30);
    if (vaderSound.currentTime !== 0) {
      soundStop(vaderSound);
    }
  }
  if (typed.length >= keywordVader.length) {
    typed = typed.substring(typed.length - keywordVader.length);
  }
});

// Function Section

function soundStop(sound) {
  sound.pause();
  sound.currentTime = 0;
}

function soundStartStop(sound, timeToStopInSec) {
  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, timeToStopInSec * 1000);
}

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
    element.className = classElement;
  }
  if (textElement !== undefined) {
    element.textContent = textElement;
  }
  if (srcElement !== undefined) {
    element.src = srcElement;
  }
  return element;
}

function createTableWitchData(category) {
  // Border tylko dla aktualnej
  let markedCheckbox = [];
  const buttons = divButtons.children;
  for (const button of buttons) {
    button.style.border = "none";
  }
  const clickedButton = document.getElementById(category);
  clickedButton.style.border = "solid var(--green) 2px";
  content.removeChild(content.lastElementChild);
  // Tworzenie tabeli
  const containerForTable = buildElement("div", "containerForTable");
  const searchArea = buildElement("div", "searchArea");
  const mainTable = buildElement("table", "mainTable");
  const changePageArea = buildElement("div", "changePageArea");
  containerForTable.append(searchArea, mainTable, changePageArea);
  const mainTableHeader = buildElement("thead", "mainTableHeader");
  const mainTableBody = buildElement("tbody", "mainTableBody");
  mainTable.append(mainTableHeader, mainTableBody);
  const headerRow = buildElement("tr");
  mainTableHeader.appendChild(headerRow);
  const headerId = buildElement("th");
  headerRow.appendChild(headerId);

  // dodawanie kolumn
  let columns;
  switch (category) {
    case "vehicles":
      columns = ["name", "model", "manufacturer", "created"];
      break;
    case "starships":
      columns = ["name", "model", "manufacturer", "created"];
      break;
    case "planets":
      columns = ["name", "climate", "terrain", "created"];
      break;
    case "people":
      columns = ["name", "birth_year", "gender", "created"];
      break;
    case "species":
      columns = ["name", "classification", "language", "created"];
      break;
    case "films":
      columns = ["title", "director", "release_date", "created"];
      break;
  }
  for (const key in rowData[category][0]) {
    if (columns.includes(key)) {
      const data = key.replace("_", " ");
      const headerColumn = buildElement("th", undefined, undefined, data);
      headerRow.appendChild(headerColumn);
    }
  }
  // dodanie kolumny Akcja
  const headerAction = buildElement("th", undefined, undefined, "action");
  headerRow.appendChild(headerAction);
  // Content tabeli

  for (const index in rowData[category]) {
    //Index
    const id = parseInt(index) + 1;
    const bodyRow = buildElement("tr", `id_${id}`, "trBody");
    mainTableBody.appendChild(bodyRow);
    const indexRecord = buildElement("td", undefined, "tdIndex", id);
    bodyRow.appendChild(indexRecord);
    const row = rowData[category][index];
    // dodawanie wartości rekordów
    for (const key in row) {
      if (columns.includes(key)) {
        let recordData = row[key];
        if (key === "created") {
          recordData = recordData.slice(0, 10).split("-").reverse().join("-");
        }
        const record = buildElement("td", undefined, undefined, recordData);
        bodyRow.appendChild(record);
      }
    }
    // Tworzenie Zawartości w rekordach akcji
    const tdAction = buildElement("td", undefined, "tdAction");
    bodyRow.appendChild(tdAction);
    // Delete Button
    const deleteButton = buildElement("button", undefined, "deleteButton");
    deleteButton.addEventListener("click", () => {
      removeRow(bodyRow);
      if (markedCheckbox.includes(bodyRow)) {
        const element = markedCheckbox.indexOf(bodyRow);
        markedCheckbox.splice(element, 1, "empty");
      }
    });
    const trashCan = buildElement("img", undefined, "trashCan", undefined, "./img/trash-can.svg");
    deleteButton.appendChild(trashCan);
    // Info Button
    const infoButton = buildElement("button", "infoButton", undefined, "+");
    infoButton.addEventListener("click", () => infoRow(body, row));
    // checkBox

    const checkBoxRow = buildElement("input", undefined, "checkBoxRow");
    checkBoxRow.type = "checkbox";
    checkBoxRow.addEventListener("click", () => checkSelected(checkBoxRow, markedCheckbox, bodyRow));
    tdAction.append(deleteButton, infoButton, checkBoxRow);
  }
  let rekordy = mainTableBody.children.length;
  const lastPage = buildElement("button", "leftArrow", undefined, "<");
  const inputToChangePage = buildElement("input", "page");
  inputToChangePage.setAttribute("placeholder", "1");
  const quantityPages = buildElement("span", "lastPage", undefined, " z 1"); //Do zmiany text -
  const nextPage = buildElement("button", "rightArrow", undefined, ">");
  const maxRowsInTable = buildElement("select", "maxRows");
  const listOfMaxRows = [10, 20];
  listOfMaxRows.forEach((item) => {
    const maxPages = buildElement("option");
    maxPages.text = item;
    maxPages.value = item;
    maxRowsInTable.appendChild(maxPages);
  });
  changePageArea.append(lastPage, inputToChangePage, quantityPages, nextPage, maxRowsInTable);
  const idSearch = buildElement("input", "idSearch");
  idSearch.setAttribute("placeholder", `1-${rekordy}`);
  const nameSearch = buildElement("input", "nameSearch");
  nameSearch.setAttribute("placeholder", `search by ${"name/title"}`);
  searchArea.append(idSearch, nameSearch);

  content.append(containerForTable);
}

// Remove Row
function removeRow(child) {
  mainTableBody.removeChild(child);
  if (mainTableBody.children.length === 0) {
    mainTableBody.textContent = "Brak elementów do wyświetlenia";
    idSearch.placeholder = "0";
  } else {
    idSearch.placeholder = `1-${mainTableBody.children.length}`;
  }
}

function mainSearch() {}
function searchById(id) {}
function searchByText(text) {}
// Info row
function infoRow(parent, row) {
  const info = buildElement("table", "info");
  parent.appendChild(info);
  const infoHead = buildElement("thead");
  const infoBody = buildElement("tbody");
  info.append(infoHead, infoBody);
  const infoTrHead = buildElement("tr");
  infoHead.appendChild(infoTrHead);
  const infoTdHead = buildElement("td");
  infoTdHead.setAttribute("colspan", 2);
  infoTrHead.appendChild(infoTdHead);
  const closeInfoButton = buildElement("button", undefined, undefined, "Close");
  closeInfoButton.addEventListener("click", () => parent.removeChild(info));
  infoTdHead.appendChild(closeInfoButton);
  for (const dataName in row) {
    let record = row[dataName];
    if (dataName === "created") {
      record = record.slice(0, 10).split("-").reverse().join("-");
    }
    const infoTrBody = buildElement("tr");
    infoBody.appendChild(infoTrBody);
    const infoThBody = buildElement("th", undefined, undefined, `${dataName} :`);
    const infoTdBody = buildElement("td", undefined, undefined, record);
    infoTrBody.append(infoThBody, infoTdBody);
  }
}

function checkSelected(checkbox, listOfMarkedCheckboxs, row) {
  if (checkbox.checked) {
    const empty = listOfMarkedCheckboxs.indexOf("empty");
    if (empty === -1) {
      listOfMarkedCheckboxs.push(row);
    } else {
      listOfMarkedCheckboxs[empty] = row;
    }
  } else if (listOfMarkedCheckboxs.includes(row)) {
    const element = listOfMarkedCheckboxs.indexOf(row);
    listOfMarkedCheckboxs.splice(element, 1, "empty");
    if (clearList(listOfMarkedCheckboxs)) {
    }
  }
  console.log(listOfMarkedCheckboxs);
  const czyJest = Boolean(document.getElementById("removeAllButton"));
  if (!czyJest) {
    const removeAllButton = buildElement("button", "removeAllButton", undefined, "Remove All");
    removeAllButton.addEventListener("click", () => {
      for (const check of listOfMarkedCheckboxs) {
        if (check === "empty") {
          continue;
        }
        removeRow(check);
      }
      listOfMarkedCheckboxs.splice(0, listOfMarkedCheckboxs.length);
      changePageArea.removeChild(removeAllButton);
    });
    changePageArea.append(removeAllButton);
  } else if (listOfMarkedCheckboxs.length == 0 && czyJest) {
    const removeAllButton = document.getElementById("removeAllButton");
    changePageArea.removeChild(removeAllButton);
  }
}

function clearList(list) {
  if (list[list.length - 1] === "empty") {
    list.pop();
    return clearList(list);
  } else {
    return true;
  }
}
// Zrobione 15 pkt
