const darkmode = document.querySelector(".darkmode");
const body = document.querySelector("body");
const mobile = document.querySelector(".mobile");
const nav = document.querySelectorAll("nav ul li");
const visit = document.querySelector("#visits");
const weatherContainer = document.getElementById("weather-container");
const apiKey = "f26a1d2c7387a78efdda84903fecbb7f";
const city = "São Paulo";

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

  if (weatherContainer) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("description").textContent = `${description}`;
        document.getElementById(
          "weather-icon"
        ).src = `https://openweathermap.org/img/w/${icon}.png`;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherContainer.textContent =
          "Failed to fetch weather data. Please try again later.";
      });
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

if (document.querySelector("#rating")) {
  document.querySelector("#rating").addEventListener("change", (e) => {
    document.querySelector("#rating-count").textContent = e.target.value;
  });
}

if (document.querySelector("#confirmPassword")) {
  document
    .querySelector("#confirmPassword")
    .addEventListener("focusout", (e) => {
      if (e.target.value !== document.querySelector("#password").value) {
        document.querySelector(
          ".message"
        ).textContent = `❗Confirm password DO NOT MATCH!`;
        e.target.value = "";
      } else {
        document.querySelector(".message").textContent = "";
      }
    });
}
