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
    searchBar.style.display = 'none';
    muscleSelect.style.display = 'none';
  }
});

muscleRadio.addEventListener('change', function() {
  // If the Muscle radio button is selected, show the muscle select element and hide the other elements
  if (muscleRadio.checked) {
    muscleSelect.style.display = 'block';
    searchBar.style.display = 'none';
    typeSelect.style.display = 'none';
  }
});
