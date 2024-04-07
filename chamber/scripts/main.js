const text = document.querySelector(".text");
const grid = document.querySelector(".grid");
const list = document.querySelector(".list");
const links = document.querySelector(".links");
const mobile = document.querySelector(".mobile");
const weather = document.querySelector(".weather");
const mobileClose = document.querySelector(".mobile-close");
const directoryContainer = document.querySelector(".directory");
const memberssection = document.querySelector(".memberssection");

const apiKey = "f26a1d2c7387a78efdda84903fecbb7f";
const loc = "brasil";

const getCurrentWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return data;
};

const getForecast = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return data;
};

const getMembers = async () => {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data;
};

const updateWeather = async () => {
  const currentWeather = await getCurrentWeather();
  const temperatureElement = document.querySelector(".temperature");
  const descriptionElement = document.querySelector(".description");
  const locationElement = document.querySelector(".location");

  temperatureElement.textContent = `${currentWeather.main.temp}°C`;
  descriptionElement.textContent = currentWeather.weather[0].description;
  locationElement.textContent = loc;

  const weatherIconElement = document.querySelector(".weather-icon");
  weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather Icon">`;
};

const displayForecast = async () => {
  const forecastDiv = document.querySelector("#forecastList");
  const forecastData = await getForecast();
  const forecastList = forecastData.list;
  forecastDiv.innerHTML = "";

  for (let i = 0; i < forecastList.length; i += 8) {
    if (i < 24) {
      const forecastDate = new Date(forecastList[i].dt * 1000);
      const temperature = forecastList[i].main.temp;

      const listItem = document.createElement("li");
      listItem.innerHTML = `<span class="date">${forecastDate.toDateString()}</span> - <span class="temperature">${temperature}°C</span>`;
      forecastDiv.appendChild(listItem);
    }
  }
};

mobile.addEventListener("click", () => {
  links.classList.toggle("active");
});
if (grid) {
  grid.addEventListener("click", (e) => {
    e.target.classList.add("on");
    list.classList.remove("on");
    directoryHandler();
  });
}

if (list) {
  list.addEventListener("click", (e) => {
    e.target.classList.add("on");
    grid.classList.remove("on");
    directoryHandler();
  });
}

mobileClose.addEventListener("click", () => {
  links.classList.remove("active");
});

const membersHomepage = async () => {
  const members = await getMembers();
  const membersArr = members.members.filter(
    (e) => e.membership_level === "Silver" || e.membership_level === "Gold"
  );

  for (let i = membersArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [membersArr[i], membersArr[j]] = [membersArr[j], membersArr[i]];
  }
  const selectedMembers = membersArr.slice(0, 3);

  selectedMembers.forEach((e) => {
    memberssection.innerHTML += ` <div class="member-card">
      <span class="member-info">${e.name}</span>
      <span class="member-info">${e.membership_level}</span>
      <p class="member-description">${e.other_information}</p>
      </div>
    `;
  });
};

const directoryHandler = async () => {
  const data = await getMembers();
  directoryContainer.innerHTML = "";
  data.members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("card");
    if (grid.classList.contains("on")) {
      directoryContainer.classList.remove("directory-list");
      memberCard.innerHTML = `
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}">${member.website}</a></p>
                <p>Membership Level: ${member.membership_level}</p>
                <p>${member.other_information}</p>
            `;
    } else {
      directoryContainer.classList.add("directory-list");
      memberCard.innerHTML = `
                <h2>${member.name}</h2>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}">${member.website}</a></p>
                <p>Membership Level: ${member.membership_level}</p>
            `;
    }

    directoryContainer.appendChild(memberCard);
  });
};

const welcomeText = () => {
  document.getElementById("lastModified").textContent = document.lastModified;
  const day = new Date();
  const textLocal = localStorage.getItem("text")
    ? localStorage.getItem("text")
    : localStorage.setItem("text", day);

  let daysDifference = Math.floor(
    (day - new Date(textLocal)) / (1000 * 60 * 60 * 24)
  );

  if (isNaN(daysDifference)) {
    text.textContent = "Welcome! Let us know if you have any questions.";
  } else if (daysDifference <= 1) {
    text.textContent = "Back so soon! Awesome!";
  } else {
    text.textContent = `You last visited ${daysDifference} days ago.`;
  }
};

const isWeekday = () => {
  const today = new Date().getDay();
  return today >= 1 && today <= 3;
};

const showBanner = () => {
  const banner = document.querySelector("#banner");
  if (isWeekday()) {
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
};

const closeBanner = () => {
  const banner = document.querySelector("#banner");
  banner.style.display = "none";
};
if (document.querySelector("#closeBanner"))
  document.querySelector("#closeBanner").addEventListener("click", closeBanner);

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#timestamp"))
    document.querySelector("#timestamp").value = new Date().toISOString();
  if (text) welcomeText();
  if (directoryContainer) directoryHandler();
  if (weather) {
    updateWeather();
    displayForecast();
    membersHomepage();
    showBanner();
  }
  if (document.querySelector(".discover-weather")) updateWeather();
});
