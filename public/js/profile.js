const searchFormHandler = async (event) => {
  event.preventDefault();
  let offset = 0;

  const searchResultsDiv = document.querySelector('#search-results');

  const param = document.querySelector('#search-criteria').value.trim();
  const val = document.querySelector('#search-term').value.trim();

  if (param && val) {
    try {
      const response = await fetch('/api/profile/search', {
        method: 'POST',
        body: JSON.stringify({ param, val, offset }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response.status)

      if (response.ok) {
        const newHTML = await response.text();
        
        searchResultsDiv.innerHTML = newHTML;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

document
  .querySelector('#search-form')
  .addEventListener('submit', searchFormHandler);
