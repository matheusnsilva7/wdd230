const darkmode = document.querySelector(".darkmode");
const body = document.querySelector("body");
const mobile = document.querySelector(".mobile");
const nav = document.querySelectorAll("nav ul li");

darkmode.addEventListener("click", () => {
  body.classList.toggle("dark");

  const mode = body.classList.contains("dark") ? "🌞" : "🌑";
  darkmode.textContent = mode;
  localStorage.setItem("darkmode", mode === "🌞" ? true : false);
});

window.addEventListener("load", () => {
  const mode = localStorage.getItem("darkmode") === "true";
  darkmode.textContent = mode ? "🌞" : "🌑";
  if (mode) {
    body.classList.toggle("dark");
  }
});

mobile.addEventListener("click", () => {
  nav.forEach((e) => {
    console.log(e.classList);
    e.classList.toggle("show");
  });

  if (nav[0].classList.contains("show")) {
    mobile.textContent = "✖";
  } else {
    mobile.textContent = "☰";
  }
});
