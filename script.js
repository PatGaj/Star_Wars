const body = document.body;
// Nav
const nav = document.createElement("nav");
const navText = document.createElement("div");
navText.textContent = `To see something interesting type "vader" or "yoda"`;
const saber = document.createElement("div");
saber.id = "saber";
const saberImg = document.createElement("img");
saberImg.src = ".\\img\\lightsaber.png";
const themeButton = document.createElement("button");
themeButton.textContent = "Light side";
themeButton.addEventListener("click", changeSide);
saber.append(saberImg, themeButton);
nav.append(navText, saber);
// Buttons
const divButtons = document.createElement("div");
divButtons.id = "buttons";
const tabButtons = [
  "vehicles",
  "starships",
  "species",
  "planets",
  "people",
  "films",
];
tabButtons.forEach((buttonName) => {
  const button = document.createElement("button");
  button.id = buttonName;
  button.textContent = buttonName.toUpperCase();
  divButtons.appendChild(button);
});

// Logo
const logo = document.createElement("img");
logo.id = "logo";
logo.src = ".\\img\\star_wars.png";

// Vader
const vader = document.createElement("img");
vader.id = "vader";
vader.src = ".\\img\\vader.png";
// Yoda
const yoda = document.createElement("img");
yoda.id = "yoda";
yoda.src = ".\\img\\yoda.png";
// Destroyer
const destroyer = document.createElement("img");
destroyer.src = ".\\img\\destroyer.png";
destroyer.id = "destroyer";
// xWing
const xWing = document.createElement("img");
xWing.src = ".\\img\\xwing.png";
xWing.id = "xWing";

body.append(nav, divButtons, logo, vader, yoda, destroyer, xWing);
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

document.addEventListener("keydown", function (event) {
  typed += event.key.toLowerCase();
  console.log(typed);
  if (typed.includes(keywordVader)) {
    typed = "";
    document.getElementById("vaderSound").play();
    document.getElementById("yodaSound").load();
    vader.style.display = "block";
    setTimeout(() => {
      destroyer.style.display = "block";
    }, 6000);

    yoda.style.display = "none";
    xWing.style.display = "none";
    setTimeout(() => {
      vader.style.display = "none";
      destroyer.style.display = "none";
    }, 89900);
  } else if (typed.includes(keywordYoda)) {
    typed = "";
    document.getElementById("yodaSound").play();
    document.getElementById("vaderSound").load();
    yoda.style.display = "block";
    vader.style.display = "none";
    destroyer.style.display = "none";
    setTimeout(() => {
      xWing.style.display = "block";
    }, 8000);
    setTimeout(() => {
      yoda.style.display = "none";
      xWing.style.display = "none";
    }, 58900);
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
    themeButton.style.boxShadow = "0 0 5px 3px var(--red)";
    themeButton.style.backgroundColor = "var(--red)";
    body.style.backgroundImage = 'url("./img/vader_background.jpg")';
    buttons.forEach((button) => {
      button.style.boxShadow = "inset 0 -5px 10px 5px var(--red)";
      button.style.color = "var(--red)";
    });
  } else if (themeButton.textContent === "Dark side") {
    themeButton.textContent = "Light side";
    themeButton.style.boxShadow = "0 0 5px 3px var(--green)";
    themeButton.style.backgroundColor = "var(--green)";
    body.style.backgroundImage = 'url("./img/falcon_background.jpg")';
    buttons.forEach((button) => {
      button.style.boxShadow = "inset 0 -5px 10px 5px var(--black)";
      button.style.color = "var(--black)";
    });
  }
}
