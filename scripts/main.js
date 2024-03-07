const darkmode = document.querySelector(".darkmode");
const body = document.querySelector("body");

darkmode.addEventListener("click", () => {
  body.classList.toggle("dark");

  const mode = body.classList.contains("dark") ? "🌞" : "🌜";
  darkmode.textContent = mode;
  localStorage.setItem("darkmode", mode === "🌞" ? true : false);
});

window.addEventListener("load", () => {
  const mode = localStorage.getItem("darkmode") === "true";
  darkmode.textContent = mode ? "🌞" : "🌜";
  if (mode) {
    body.classList.toggle("dark");
  }
});
