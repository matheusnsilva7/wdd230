const darkmode = document.querySelector(".darkmode");
const body = document.querySelector("body");
const mobile = document.querySelector(".mobile");
const nav = document.querySelectorAll("nav ul li");
const visit = document.querySelector("#visits");

darkmode.addEventListener("click", () => {
  body.classList.toggle("dark");

  const mode = body.classList.contains("dark") ? "🌞" : "🌙";
  darkmode.textContent = mode;
  localStorage.setItem("darkmode", mode === "🌞" ? true : false);
});

window.addEventListener("load", () => {
  const mode = localStorage.getItem("darkmode") === "true";
  localStorage.setItem("visits", +localStorage.getItem("visits") + 1);

  darkmode.textContent = mode ? "🌞" : "🌙";
  if (mode) {
    body.classList.toggle("dark");
  }
  if (visit) {
    visit.textContent = localStorage.getItem("visits");
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

document.querySelector("#rating").addEventListener("change", (e) => {
  document.querySelector("#rating-count").textContent = e.target.value;
});

document.querySelector("#confirmPassword").addEventListener("focusout", (e) => {
  if (e.target.value !== document.querySelector("#password").value) {
    document.querySelector(
      ".message"
    ).textContent = `❗Confirm password DO NOT MATCH!`;
    e.target.value = "";
  } else {
    document.querySelector(".message").textContent = "";
  }
});
