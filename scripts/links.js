const links = document.querySelector(".links-learning-Activities");
const linksURL = "https://matheusnsilva7.github.io/wdd230/data/links.json";

if (links) {
  const getLinks = async () => {
    try {
      const response = await fetch(linksURL);
      const data = await response.json();
      displayLinks(data.weeks);
    } catch (error) {
      console.error("Error fetching links data:", error);
    }
  };

  const displayLinks = (data) => {
    links.innerHTML = "";
    data.forEach((element) => {
      let link = "";
      element.links.forEach(
        (e) =>
          (link += ` <a href="${e.url}">${e.title}</a> ${
            e !== element.links[element.links.length - 1] ? "|" : ""
          }`)
      );
      links.innerHTML += `
            <li>
            ${element.week}: ${link}
          </li>
            `;
    });
  };

  getLinks();
}
