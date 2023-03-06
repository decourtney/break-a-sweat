const router = require('express').Router();
const { User, Exercise, UserFavorite, UserExercise } = require('../../models');
const withAuth = require('../../utils/auth');
const { getExercises, getRandomExercises } = require('../../utils/apiService');
const Handlebars = require('handlebars');

router.get('/', withAuth, async (req, res) => {
  try {

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Gets the users data then all other users relevant info
router.get('/chart-info', withAuth, async (req, res) => {
  try {
    // { age: 25, weight: 70, height: 170, bmi: 23, exerciseDuration: 30, weightsUsed: [10, 15, 20] },
    const user = await User.findByPk(1 /*req.session.user_id*/, {
      attributes: ['username', 'age', 'weight', 'height', 'bmi']
    });

    const members = await User.findAll({
      attributes: ['age', 'weight', 'height', 'bmi']
    });

    res.status(201).json([user, members]);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

router.post('/search', withAuth, async (req, res) => {
  try {
    const exerciseData = await getExercises(req.body.param, req.body.val, req.body.offset);
    console.log(exerciseData);

    const searchResultsCards = Handlebars.compile(`
    <button id="prev-button" data-offset="0" class="paginate searches w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto pointer-events-none"><path d="M15 18l-6-6 6-6"></path></svg>
    </button>

    {{#each results}}
      {{!-- Exercise Card --}}
      <div id="exercise-card" class="card flex overflow-x-hidden cursor-pointer" style="width: 80%">
        <div class="inline-flex pointer-events-none">
          <div class="w-64 h-64 bg-gray-100 shadow-lg rounded-lg p-6">
              <h2 class="text-lg font-medium mb-4 user-select-none">{{name}}</h2>
              <p class="text-gray-600">{{type}}</p>
          </div>
        </div>

        <div class="flex justify-center pt-4">
          <button id="add-favorites" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-id="{{id}}">
            Add to favorites
          </button>
        </div>

        {{!-- Details Card (initially hidden) --}}
        <div id="overlay" class="card fixed top-0 left-0 w-full h-full flex items-center justify-center"
          style="display: none;">
          <div class="pointer-events-none">
            <div class="w-64 h-64 bg-white shadow-lg rounded-lg p-6">
            <h2 id="name" class="text-lg font-medium mb-4">{{name}}</h2>
            <p id="type" class="text-gray-600">{{type}}</p>
            <p id="muscle" class="text-gray-600">{{muscle}}</p>
            <p id="equipment" class="text-gray-600">{{equipment}}</p>
            <p id="difficulty" class="text-gray-600">{{difficulty}}</p>
            <p id="instructions" class="text-gray-600">{{instructions}}</p>
            </div>
          </div>
        </div>
      </div>
    {{/each}}

    <button id="next-button" data-offset="0" class="paginate searches w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto pointer-events-none"><path d="M9 18l6-6-6-6"></path></svg>
    </button>
    `);

    const searchResultsHTML = searchResultsCards({ results: exerciseData }).toString();

    res.status(200).send(searchResultsHTML)
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

router.post('/get-randoms', withAuth, async (req, res) => {
  try {
    const randoms = await getRandomExercises(req.body.offset);
    if (!randoms) randoms = { name: `Sorry. I don't have any suggestions` }

    const randomResultsCards = Handlebars.compile(`
    <button id="prev-button" data-offset="0" class="paginate randoms w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto pointer-events-none">
        <path d="M15 18l-6-6 6-6"></path>
      </svg>
    </button>

    {{#each results}}
    {{!-- Exercise Card --}}
    <div id="exercise-card" class="card flex overflow-x-hidden cursor-pointer" style="width: 80%">
      <div class="inline-flex pointer-events-none">
        <div class="w-64 h-64 bg-gray-100 shadow-lg rounded-lg p-6" id="card1">
            <h2 class="text-lg font-medium mb-4 user-select-none">{{name}}</h2>
            <p class="text-gray-600">{{type}}</p>
        </div>
      </div>

      {{!-- Details Card (initially hidden) --}}
      <div id="overlay" class="card fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style="display: none;">
        <div class="pointer-events-none">
          <div class="w-64 h-64 bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-lg font-medium mb-4">{{name}}</h2>
            <p class="text-gray-600">{{type}}</p>
            <p class="text-gray-600">{{muscle}}</p>
            <p class="text-gray-600">{{equipment}}</p>
            <p class="text-gray-600">{{difficulty}}</p>
            <p class="text-gray-600">{{instructions}}</p>
          </div>
        </div>
      </div>
    </div>
    {{/each}}

    <button id="next-button" data-offset="0" class="paginate randoms w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto pointer-events-none"><path d="M9 18l6-6-6-6"></path></svg>
    </button>
    `);

    const randomResultsHTML = randomResultsCards({ results: randoms });

    res.status(200).send(randomResultsHTML);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

module.exports = router;
