const mobile = document.querySelector(".mobile");
const links = document.querySelector(".links");
const mobileClose = document.querySelector(".mobile-close");

mobile.addEventListener("click", () => {
  links.classList.toggle("active");
});

mobileClose.addEventListener("click", () => {
  links.classList.remove("active");
});
