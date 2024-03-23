const mobile = document.querySelector(".mobile");
const links = document.querySelector(".links");
const mobileClose = document.querySelector(".mobile-close");
const text = document.querySelector(".text");

mobile.addEventListener("click", () => {
  links.classList.toggle("active");
});

mobileClose.addEventListener("click", () => {
  links.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("timestamp")) {
    document.getElementById("timestamp").value = new Date().toISOString();
  }

  if (text) {
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
  }
});
