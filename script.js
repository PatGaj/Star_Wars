const body = document.body;
// Nav
const nav = document.createElement("nav");
const navText = document.createElement("div");
navText.textContent = `To see something interesting type "vader" or "yoda"`;
const saber = document.createElement("div");
saber.id = "saber";
const saberImg = document.createElement("img");
saberImg.src = "img\\lightsaber.png";
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

// Logos
const logo = document.createElement("img");
logo.id = "logo";
logo.src = "img\\star_wars.png";
// Vader
const vader = document.createElement("img");
vader.id = "vader";
vader.src = "img\\vader.png";
// Yoda
const yoda = document.createElement("img");
yoda.id = "yoda";
yoda.src = "img\\yoda.png";

body.append(nav, divButtons, logo, vader, yoda);

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
