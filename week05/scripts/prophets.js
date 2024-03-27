const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const getProphetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    card.classList.add('card');
    const fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    const portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '200');
    portrait.setAttribute('height', '300');

    card.appendChild(fullName);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

getProphetData();
