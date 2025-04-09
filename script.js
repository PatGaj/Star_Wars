import { rowData } from "./data.js";

const body = document.body;
const nav = buildElement("nav");
const spanNav = buildElement("span", undefined, undefined, "To hear something type 'vader' or 'yoda'");
const themeButton = buildElement("button", "themeButton", undefined, "Dark side");
themeButton.addEventListener("click", changeSide);
nav.append(spanNav, themeButton);
const divButtons = buildElement("div", "divButtons");
for (const key in rowData) {
  const button = buildElement("button", key, "categoryButtons", key.toUpperCase());
  button.addEventListener("click", () => makeTableWitchData(key));
  divButtons.appendChild(button);
}
const content = buildElement("div", "content");
const logo = buildElement("img", "logo", undefined, undefined, "./img/star_wars.png");
content.appendChild(logo);
const mainRowsInTable = [];
const searchedRows = [];
const markedCheckbox = [];
let actuallyPage = 0;
let quantityPages = 1;
const containerForTable = buildElement("div", "containerForTable");
const searchArea = buildElement("div", "searchArea");
const mainTable = buildElement("table", "mainTable");
containerForTable.style.display = "none";
const changePageArea = buildElement("div", "changePageArea");
containerForTable.append(searchArea, mainTable, changePageArea);
content.appendChild(containerForTable);
const idSearch = buildElement("input", "idSearch", "search");
idSearch.setAttribute("type", "number");
idSearch.setAttribute("placeholder", `Id`);
idSearch.min = 1;
const nameSearch = buildElement("input", "nameSearch", "search");
nameSearch.setAttribute("placeholder", `search by `);
const searchButton = buildElement("button", "searchButton", undefined, "Search");
searchButton.addEventListener("click", addRow);
searchArea.append(idSearch, nameSearch, searchButton);
const previousPage = buildElement("button", "previousPage", "arrowsToChangePage", "<");
previousPage.addEventListener("click", () => {
  if (actuallyPage !== 0) {
    actuallyPage -= 1;
    addRow();
  }
});
const nextPage = buildElement("button", "nextPage", "arrowsToChangePage", ">");
nextPage.addEventListener("click", () => {
  if (actuallyPage + 1 !== quantityPages) {
    actuallyPage += 1;
    addRow();
  }
});
const inputToChangePage = buildElement("input", "inputToChangePage");
inputToChangePage.setAttribute("placeholder", actuallyPage + 1);
inputToChangePage.addEventListener("change", () => {
  let changePage = parseInt(inputToChangePage.value);
  if (changePage > quantityPages) {
    changePage = quantityPages;
  }
  actuallyPage = changePage - 1;
  addRow();
  inputToChangePage.value = "";
});
const maxRowsInPage = buildElement("select", "maxRowsInPage");
maxRowsInPage.addEventListener("change", () => {
  actuallyPage = 0;
  addRow();
});
const listOfMaxRows = [10, 20];
listOfMaxRows.forEach((item) => {
  const maxPages = buildElement("option");
  maxPages.text = item;
  maxPages.value = item;
  maxRowsInPage.appendChild(maxPages);
});
const lastPage = buildElement("span", "lastPage");
const containerForActualPage = buildElement("div", "containerForActualPage");
containerForActualPage.append(inputToChangePage, lastPage);
const pagination = buildElement("div", "pagination");
pagination.append(previousPage, containerForActualPage, nextPage, maxRowsInPage);
changePageArea.append(pagination);
const vaderSound = buildElement("audio", "vaderSound", undefined, undefined, "./mp3/sound-for-vader.mp3");
const yodaSound = buildElement("audio", "yodaSound", undefined, undefined, "./mp3/sound-for-yoda.mp3");
body.append(nav, divButtons, content, vaderSound, yodaSound);
let typed = "";
const keywordVader = "vader";
const keywordYoda = "yoda";
document.addEventListener("keydown", (event) => {
  typed += event.key.toLowerCase();
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
  const lightTheme = [
    "#9eaba2ee",
    "#bdd1c5ee",
    "#eecc8cbb",
    "#e8b298bb",
    "#d3a29d",
    "#a36361",
    "#492928",
    "#ff0000",
    "#000000",
  ];
  const darkTheme = [
    "#4b462fee",
    "#7a7352ee",
    "#551a1ad2",
    "#420b0baa",
    "#ad1906",
    "#7c1616",
    "#ff0000",
    "#00ff00",
    "#ff0000",
  ];
  const buttons = document.querySelectorAll("#buttons button");
  if (themeButton.textContent === "Dark side") {
    for (let i = 1; i <= darkTheme.length; i++) {
      document.documentElement.style.setProperty(`--color${i}`, darkTheme[i - 1]);
    }
    themeButton.textContent = "Light side";
    body.style.backgroundImage = 'url("./img/vader_background.jpg")';
  } else if (themeButton.textContent === "Light side") {
    for (let i = 1; i <= lightTheme.length; i++) {
      document.documentElement.style.setProperty(`--color${i}`, lightTheme[i - 1]);
    }
    themeButton.textContent = "Dark side";
    body.style.backgroundImage = 'url("./img/falcon_background.jpg")';
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
function actuallyCategory(category) {
  const buttons = divButtons.children;
  for (const button of buttons) {
    button.style.border = "none";
  }
  const clickedButton = document.getElementById(category);
  clickedButton.style.border = "solid var(--dark-green) 2px";
}
function removeRow(child) {
  const mainTableBody = document.getElementById("mainTableBody");
  mainRowsInTable.splice(mainRowsInTable.indexOf(child), 1);
  if (mainTableBody.children.length === 1 && mainRowsInTable.length !== 0) {
    actuallyPage = quantityPages - 2;
    if (actuallyPage < 0) {
      actuallyPage = 0;
    }
  } else if (mainRowsInTable.length === 0) {
    mainTableBody.textContent = "Brak elementów do wyświetlenia";
  }
  addRow();
}
function infoRow(parent, rowToGetInfo) {
  const info = buildElement("table", "info");
  parent.appendChild(info);
  const infoHead = buildElement("thead");
  const infoBody = buildElement("tbody");
  info.append(infoHead, infoBody);
  const infoTrHead = buildElement("tr");
  infoHead.appendChild(infoTrHead);
  const infoTdHead = buildElement("td", "infoTdHead");
  infoTdHead.setAttribute("colspan", 2);
  infoTrHead.appendChild(infoTdHead);
  const closeInfoButton = buildElement("button", "closeInfoButton", undefined, "Close");
  closeInfoButton.addEventListener("click", () => parent.removeChild(info));
  infoTdHead.appendChild(closeInfoButton);
  for (const dataName in rowToGetInfo) {
    let record = rowToGetInfo[dataName];
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
function checkSelected(checkbox, listOfMarkedCheckbox, row) {
  if (checkbox.checked) {
    const empty = listOfMarkedCheckbox.indexOf("empty");
    if (empty === -1) {
      listOfMarkedCheckbox.push(row);
    } else {
      listOfMarkedCheckbox[empty] = row;
    }
  } else if (listOfMarkedCheckbox.includes(row)) {
    const indexOfTheElement = listOfMarkedCheckbox.indexOf(row);
    listOfMarkedCheckbox.splice(indexOfTheElement, 1, "empty");
    clearList(listOfMarkedCheckbox);
  }
  const removeAllButtonExist = Boolean(document.getElementById("removeAllButton"));
  if (!removeAllButtonExist) {
    const removeAllButton = buildElement("button", "removeAllButton", undefined, "Remove All");
    removeAllButton.addEventListener("click", () => {
      for (const check of listOfMarkedCheckbox) {
        if (check === "empty") {
          continue;
        }
        removeRow(check);
      }
      listOfMarkedCheckbox.splice(0, listOfMarkedCheckbox.length);
      changePageArea.removeChild(removeAllButton);
    });
    changePageArea.append(removeAllButton);
  } else if (listOfMarkedCheckbox.length == 0 && removeAllButtonExist) {
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

function makeTableWitchData(category) {
  actuallyCategory(category);
  while (markedCheckbox.length !== 0) {
    markedCheckbox.pop();
  }
  if (Boolean(document.getElementById("removeAllButton"))) {
    changePageArea.removeChild(document.getElementById("removeAllButton"));
  }
  actuallyPage = 0;
  idSearch.value = "";
  nameSearch.value = "";
  if (Boolean(document.getElementById("logo"))) {
    content.removeChild(logo);
    containerForTable.style.display = "block";
  }
  while (mainTable.children.length !== 0) {
    mainTable.removeChild(mainTable.firstChild);
  }
  const mainTableHeader = buildElement("thead", "mainTableHeader");
  const mainTableBody = buildElement("tbody", "mainTableBody");
  mainTable.append(mainTableHeader, mainTableBody);
  const headerRow = buildElement("tr", "headerRow");
  mainTableHeader.appendChild(headerRow);
  const headerId = buildElement("th", "thIndex", undefined, "Id");
  const headerAction = buildElement("th", "headerAction", undefined, "action");
  headerRow.append(headerId, headerAction);
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
  while (mainRowsInTable.length !== 0) {
    mainRowsInTable.pop();
  }
  for (const key in rowData[category][0]) {
    if (columns.includes(key)) {
      const data = key.replace("_", " ");
      const headerColumn = buildElement("th", undefined, undefined, data);
      headerRow.insertBefore(headerColumn, headerAction);
    }
  }
  for (const index in rowData[category]) {
    const id = parseInt(index) + 1;
    const bodyRow = buildElement("tr", undefined, "trBody");
    const indexRecord = buildElement("td", undefined, "tdIndex", id);
    bodyRow.appendChild(indexRecord);
    const row = rowData[category][index];
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
    const tdAction = buildElement("td", undefined, "tdAction");
    bodyRow.appendChild(tdAction);
    const deleteButton = buildElement("button", undefined, "deleteButton");
    deleteButton.addEventListener("click", () => {
      removeRow(bodyRow);
      if (markedCheckbox.includes(bodyRow)) {
        const element = markedCheckbox.indexOf(bodyRow);
        markedCheckbox.splice(element, 1, "empty");
      }
    });
    const infoButton = buildElement("button", undefined, "infoButton", "+");
    infoButton.addEventListener("click", () => infoRow(body, row));
    const checkBoxRow = buildElement("input", undefined, "checkBoxRow");
    checkBoxRow.type = "checkbox";
    checkBoxRow.addEventListener("click", () => checkSelected(checkBoxRow, markedCheckbox, bodyRow));
    tdAction.append(deleteButton, infoButton, checkBoxRow);
    mainRowsInTable.push(bodyRow);
  }
  nameSearch.placeholder = `search by ${columns[0]}`;
  addRow();
}
function addRow() {
  search();
  const mainTableBody = document.getElementById("mainTableBody");
  while (mainTableBody.children.length !== 0) {
    mainTableBody.removeChild(mainTableBody.lastChild);
  }
  if (searchedRows.length !== 0) {
    const maxRows = parseInt(maxRowsInPage.value);
    let start = actuallyPage * maxRows;
    const stopPage = start + maxRows > searchedRows.length ? searchedRows.length : start + maxRows;
    for (start; start < stopPage; start++) {
      mainTableBody.append(searchedRows[start]);
    }
    quantityPages = Math.ceil(searchedRows.length / maxRows);
    lastPage.textContent = ` z ${quantityPages}`;
    inputToChangePage.placeholder = actuallyPage + 1;
  }
}

function search() {
  while (searchedRows.length !== 0) {
    searchedRows.pop();
  }
  const filterName = nameSearch.value.toLowerCase();
  let filterId = idSearch.value;
  for (let i = 0; i < mainRowsInTable.length; i++) {
    const text = mainRowsInTable[i].getElementsByTagName("td")[1];
    const id = mainRowsInTable[i].getElementsByTagName("td")[0];
    if (filterName !== "" && filterId !== "") {
      if (parseInt(id.textContent) === parseInt(filterId) && text.textContent.toLowerCase().indexOf(filterName) > -1) {
        searchedRows.push(mainRowsInTable[i]);
      }
    } else if (filterName !== "") {
      if (text.textContent.toLowerCase().indexOf(filterName) > -1) {
        searchedRows.push(mainRowsInTable[i]);
      }
    } else if (filterId !== "") {
      if (parseInt(id.textContent) === parseInt(filterId)) {
        searchedRows.push(mainRowsInTable[i]);
      }
    } else {
      searchedRows.push(mainRowsInTable[i]);
    }
  }
}
