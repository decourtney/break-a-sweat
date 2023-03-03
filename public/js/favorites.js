const searchResultsDiv = document.querySelector('#search-results');
const favoritesResultDiv = document.querySelector('#favorite-results');
const randomResultDiv = document.querySelector('#random-results');
const param = document.querySelector('#search-criteria').value.trim();
const val = document.querySelector('#search-term').value.trim();

const getFavorites = async () => {
  try {
    const response = await fetch('/api/users/get-favorites', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log
    if (response.ok) {
      const newHTML = await response.text();
      console.log(newHTML)
      favoritesResultDiv.innerHTML = newHTML;
    }
  } catch (error) {
    console.error(error);
  }
};

const getRandom = async () => {

};

const searchFormHandler = async (event, offset = 0) => {
  if (event) { event.preventDefault(); }

  // console.log(`These are the params from html ` + param, val)
  if (param && val) {
    try {
      const response = await fetch('/api/profile/search', {
        method: 'POST',
        body: JSON.stringify({ param, val, offset }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const newHTML = await response.text();

        searchResultsDiv.innerHTML = newHTML;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const addFavoritesHandler = async (event) => {
  const fav = favoritesResultDiv;
  const favInfo = {
    name: fav.querySelector("#name").textContent.trim(),
    type: fav.querySelector("#type").textContent.trim(),
    muscle: fav.querySelector("#muscle").textContent.trim(),
    equipment: fav.querySelector("#equipment").textContent.trim(),
    difficulty: fav.querySelector("#difficulty").textContent.trim(),
    instructions: fav.querySelector("#instructions").textContent.trim(),
  };
  console.log(favInfo);


};

const handlePaginate = (event) => { }

const cardHandler = (event) => {
  const overlay = event.target.nextElementSibling;

  if (event.target.id === 'overlay') {
    event.target.style.display = 'none'
  } else {
    overlay.style.display = 'flex';
  }
};

document
  .querySelector('#search-form')
  .addEventListener('submit', searchFormHandler);

document
  .addEventListener('DOMContentLoaded', () => {
    const paginates = document.querySelectorAll('.paginate');
    const cards = document.querySelectorAll(`#exercise-card`);

    paginates.forEach(paginate => {
      paginate.addEventListener('click', (event) => { console.log(event) });
    });

    cards.forEach(card => {
      card.addEventListener('click', cardHandler);
    });
  })

document
  .addEventListener('click', (event) => {
    if (event.target.id === 'add-favorites') {
      addFavoritesHandler();
    } else if (event.target.id === 'previous') {
      searchFormHandler(null, -10);
    } else if (event.target.id === 'next') {
      searchFormHandler(null, 10);
    }
  });

getFavorites();