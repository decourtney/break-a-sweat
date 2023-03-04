const searchResultsDiv = document.querySelector('#search-results');
const favoritesResultDiv = document.querySelector('#favorite-results');
const randomResultDiv = document.querySelector('#random-results');

const init = () => {
  getFavorites();
  getRandoms();
}

const searchFormHandler = async (event, offset = 0) => {
  if (event) { event.preventDefault(); }

  const param = document.querySelector('#search-criteria').value.trim();
  const val = document.querySelector('#search-term').value.trim();

  console.log(`These are the params from html ` + param, val)
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

const getFavorites = async (offset = 0) => {
  try {
    const response = await fetch('/api/users/get-favorites', {
      method: 'POST',
      body: JSON.stringify({ offset }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const newHTML = await response.text();
      favoritesResultDiv.innerHTML = newHTML;
    }
  } catch (error) {
    console.error(error);
  }
};

const getRandoms = async (offset = 0) => {
  try {
    const response = await fetch('/api/profile/get-randoms', {
      method: 'POST',
      body: JSON.stringify({ offset }),
      headers: { 'Content-type': 'application/json' },
    })

    if (response.ok) {
      const newHTML = await response.text();
      randomResultDiv.innerHTML = newHTML;
    }
  } catch (error) {
    console.error(error);
  }
};

const addFavoritesHandler = async (el) => {
  const infoDiv = el
  console.log(infoDiv);

  const favInfo = {
    id: infoDiv.querySelector("#add-favorites").dataset.id,
    name: infoDiv.querySelector("#name").textContent.trim(),
    type: infoDiv.querySelector("#type").textContent.trim(),
    muscle: infoDiv.querySelector("#muscle").textContent.trim(),
    equipment: infoDiv.querySelector("#equipment").textContent.trim(),
    difficulty: infoDiv.querySelector("#difficulty").textContent.trim(),
    instructions: infoDiv.querySelector("#instructions").textContent.trim(),
  };
  console.log(favInfo);

  try {
    const response = await fetch('/api/users/add-favorite', {
      method: 'POST',
      body: JSON.stringify({ favInfo }),
      headers: { 'Content-type': 'application/json' },
    });

    if(response.ok){
      console.log(response);
    }  
  } catch (error) {
    console.log(error);
  }
};

const getPaginate = (paginate) => {
  // console.log(paginate);
  const offset = parseInt(paginate.dataset.offset);
  let newOffset = 0;

  if (paginate.id === 'prev-button') {
    newOffset = Math.max(offset - 5, 0)
  } else {
    newOffset = Math.max(offset + 5, 0)
  }

  paginate.dataset.offset = newOffset;

  if (paginate.classList.contains('favorites'))
    getFavorites(newOffset);
  if (paginate.classList.contains('randoms'))
    getRandoms(newOffset);
  if (paginate.classList.contains('searches'))
    searchFormHandler(paginate, newOffset);

}

const handleClickEvents = (event) => {
  console.log(event)
  const tar = event.target;

  // If next/previous button clicked
  if (tar.classList.contains('paginate')) {
    getPaginate(event.target);
  }

  if (tar.id === 'add-favorites') {
    // console.log(event.target)
    addFavoritesHandler(event.target.closest("#exercise-card"))
  }

  // If an exercise card is clicked
  if (tar.id === 'exercise-card') {
    const overlay = tar.querySelector('#overlay');
    overlay.style.display = 'flex';
  }

  if (tar.id === 'overlay') {
    tar.style.display = 'none';
  }
};

document
  .querySelector('#search-form')
  .addEventListener('submit', searchFormHandler);

favoritesResultDiv.addEventListener('click', handleClickEvents);
searchResultsDiv.addEventListener('click', handleClickEvents);
randomResultDiv.addEventListener('click', handleClickEvents);

init();