// Divs for card insertions
const searchResultsDiv = document.querySelector('#search-results');
const favoritesResultDiv = document.querySelector('#favorite-results');
const randomResultDiv = document.querySelector('#random-results');

// Get the radio buttons and the search bar
const nameRadio = document.getElementById('name-radio');
const typeRadio = document.getElementById('type-radio');
const muscleRadio = document.getElementById('muscle-radio');
const searchBar = document.getElementById('name-search');
const typeSelect = document.getElementById('type-dropdown');
const muscleSelect = document.getElementById('muscle-dropdown');

// Hide the search bar and select elements by default
searchBar.style.display = 'none';
typeSelect.style.display = 'none';
muscleSelect.style.display = 'none';

const init = () => {
  sessionStorage.setItem(`searches-offset`, 0);
  sessionStorage.setItem(`favorites-offset`, 0);
  sessionStorage.setItem(`randoms-offset`, 0);
  getFavoritesHandler();
  getRandomsHandler();
}

const searchFormHandler = async (event, offset = 0) => {
  if (event) { event.preventDefault(); }

  let param = '';
  const radioButtons = document.getElementsByName('search-criteria');
  for (let i = 0; i < radioButtons.length; i++){
    if (radioButtons[i].checked){
      param = radioButtons[i].value.trim();
    }
  }
  const val = document.querySelector('#search-term').value.trim();

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

const getFavoritesHandler = async (event, offset = 0) => {
  try {
    // console.log('This is the offset passed to getFavoritesHandler: ' + offset);
    const response = await fetch('/api/users/get-favorites', {
      method: 'POST',
      body: JSON.stringify({ offset }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      let res = await response.json();
      // console.log(res);

      const newHTML = await res.newHTML;
      favoritesResultDiv.innerHTML = newHTML;

      if (res.eol) {
        sessionStorage.setItem('favorites-offset', 0);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const getRandomsHandler = async (event, offset = 0) => {
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
  // console.log(infoDiv);

  const favInfo = {
    // id: infoDiv.querySelector("#add-favorites").dataset.id,
    name: infoDiv.querySelector("#overlay #name").textContent.trim(),
    type: infoDiv.querySelector("#overlay #type").textContent.trim(),
    muscle: infoDiv.querySelector("#overlay #muscle").textContent.trim(),
    equipment: infoDiv.querySelector("#overlay #equipment").textContent.trim(),
    difficulty: infoDiv.querySelector("#overlay #difficulty").textContent.trim(),
    instructions: infoDiv.querySelector("#overlay #instructions").textContent.trim(),
  };
  // console.log(favInfo);

  try {
    const response = await fetch('/api/users/add-favorite', {
      method: 'POST',
      body: JSON.stringify({ favInfo }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      // console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPaginate = (paginate) => {
  let newOffset = 0;
  let storageKey = '';
  let methodToCall;

  if (paginate.target.classList.contains('favorites')) {
    storageKey = 'favorites';
    methodToCall = getFavoritesHandler;
  }
  if (paginate.target.classList.contains('randoms')) {
    storageKey = 'randoms';
    methodToCall = getRandomsHandler;
  }
  if (paginate.target.classList.contains('searches')) {
    storageKey = 'searches';
    methodToCall = searchFormHandler;
  }

  let sessionOffset = parseInt(sessionStorage.getItem(`${storageKey}-offset`));
  if (!sessionOffset) {
    sessionStorage.setItem(`${storageKey}-offset`, 0);
    sessionOffset = 0;
  }
  // console.log(`This is the value of the ${storageKey}-offset in sessionStorage: ` + sessionStorage.getItem(`${storageKey}-offset`));

  if (paginate.target.id === 'prev-button') {
    // console.log('SUBTRACT 5 from offset');
    newOffset = Math.max(sessionOffset - 5, 0);
  } else {
    // console.log('ADD 5 to offset');
    newOffset = Math.max(sessionOffset + 5, 0);
  }

  sessionStorage.setItem(`${storageKey}-offset`, newOffset);

  methodToCall(paginate, newOffset);
}

const handleClickEvents = (event) => {
  // console.log(event)
  const tar = event.target;

  // If next/previous button clicked
  if (tar.classList.contains('paginate')) { // make sure paginates work correctly. from click to api call
    getPaginate(event);
    return;
  }

  if (tar.id === 'add-favorites') {
    // console.log(event.target)
    addFavoritesHandler(event.target.closest("#exercise-card"));
    return;
  }

  // If an exercise card is clicked
  if (tar.id === 'exercise-card') {
    const overlay = tar.querySelector('#overlay');
    overlay.style.display = 'flex';
    return;
  }

  if (tar.id === 'overlay') {
    tar.style.display = 'none';
    return;
  }
};

document
  .querySelector('#search-form')
  .addEventListener('submit', searchFormHandler);

  // Event listeners for submission forms
favoritesResultDiv.addEventListener('click', handleClickEvents);
searchResultsDiv.addEventListener('click', handleClickEvents);
randomResultDiv.addEventListener('click', handleClickEvents);

// Add a change event listener to the radio buttons
nameRadio.addEventListener('change', function() {
  // If the Name radio button is selected, show the search bar and hide the other select elements
  if (nameRadio.checked) {
    searchBar.style.display = 'block';
    typeSelect.style.display = 'none';
    muscleSelect.style.display = 'none';
  }
});

typeRadio.addEventListener('change', function() {
  // If the Type radio button is selected, show the type select element and hide the other elements
  if (typeRadio.checked) {
    typeSelect.style.display = 'block';
    searchBar.style.display = 'block';
    muscleSelect.style.display = 'none';
  }
});

muscleRadio.addEventListener('change', function() {
  // If the Muscle radio button is selected, show the muscle select element and hide the other elements
  if (muscleRadio.checked) {
    muscleSelect.style.display = 'block';
    searchBar.style.display = 'block';
    typeSelect.style.display = 'none';
  }
});

// When the page loads init will load favorites and suggested(random) exercises
init();