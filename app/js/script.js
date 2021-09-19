const radioBtn = document.querySelectorAll(".toggle__wrapper input");
const light = document.getElementById("light");
const dark = document.getElementById("dark");
const body = document.body;

function setColorMode() {
  if (localStorage.getItem("color--mode") === "light") {
    setLightMode();
    light.click();
  } else if (localStorage.getItem("color--mode") === "dark") {
    setDarkMode();
    dark.click();
  }
}

function checkColorMode() {
  if (localStorage.getItem("color--mode") === null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      light.click();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dark.click();
    }
  }
}

const checkModeChange = () => {
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      checkColorMode();
    });
};

function setLightMode() {
  body.classList = "light";
}

function setDarkMode() {
  body.classList = "dark";
}
setColorMode();
checkColorMode();
checkModeChange();

radioBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (light.checked) {
      localStorage.setItem("color--mode", "light");
      setLightMode();
    } else {
      localStorage.setItem("color--mode", "dark");
      setDarkMode();
    }
  });
});
