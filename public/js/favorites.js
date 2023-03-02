const searchFormHandler = async (event, offset = 0) => {
  if(event){event.preventDefault();}
  
  
  const searchResultsDiv = document.querySelector('#search-results');
  const param = document.querySelector('#search-criteria').value.trim();
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

const addFavoritesHandler = async (event) => {
  const fav = document.querySelector('#search-results');
  const favInfo = {
    name: fav.querySelector("#name").textContent.trim(),
    type: fav.querySelector("#type").textContent.trim(),
    muscle: fav.querySelector("#muscle").textContent.trim(),
    equipment: fav.querySelector("#equipment").textContent.trim(),
    difficulty: fav.querySelector("#difficulty").textContent.trim(),
    instructions: fav.querySelector("#instructions").textContent.trim(),
  };
  console.log(favInfo);

  // Fetch to POST to add favorites
}

document
  .querySelector('#search-form')
  .addEventListener('submit', searchFormHandler);

document
  .addEventListener('click', (event) => {
    if (event.target.id === 'add-favorites') {
      addFavoritesHandler();
    } else if (event.target.id === 'previous') {
      searchFormHandler(null, -10);
    } else if (event.target.id === 'next'){
      searchFormHandler(null, 10);
    }
  });
