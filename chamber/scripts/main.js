const mobile = document.querySelector(".mobile");
const links = document.querySelector(".links");
const mobileClose = document.querySelector(".mobile-close");
const text = document.querySelector(".text");
const directoryContainer = document.querySelector(".directory");

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

  if (directoryContainer) {
    fetch("data/members.json")
      .then((response) => response.json())
      .then((data) => {
        data.members.forEach((member) => {
          const memberCard = document.createElement("div");
          memberCard.classList.add("member");

          memberCard.innerHTML = `
                  <div class="card">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p>Website: <a href="${member.website}">${member.website}</a></p>
                    <p>Membership Level: ${member.membership_level}</p>
                    <p>${member.other_information}</p>
                    </div>
                `;

          directoryContainer.appendChild(memberCard);
        });
      })
      .catch((error) => console.error("Error fetching members data:", error));
  }
});
