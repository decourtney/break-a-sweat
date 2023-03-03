const router = require('express').Router();
const { User, Exercise, UserFavorite, UserExercise } = require('../../models');
const withAuth = require('../../utils/auth');
const { getExercises, getRandomExercises } = require('../../utils/apiService');
const Handlebars = require('handlebars');

router.get('/', withAuth, async (req, res) => {
  try {
    // const newProject = await Project.create({
    //   ...req.body,
    //   user_id: req.session.user_id,
    // });

    const userFavorites = await UserFavorite.

      res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/bmi-chart-details', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

router.post('/search', withAuth, async (req, res) => {
  try {
    req.session.offset += req.body.offset
    // console.log(req.session.offset)
    const exerciseData = await getExercises(req.body.param, req.body.val, req.session.offset);
    console.log(exerciseData);

    const searchResultsCards = Handlebars.compile(`
    <div id="search-results">
      <div class="flex justify-between">
        <h2 class="text-lg font-bold">Search Results</h2>
        <div class="text-2xl">
          <button id="previous" class="text-blue-500 mr-5">Previous</button>
          <button id="next" class="text-blue-500 mr-5">Next</button>
        </div>
      </div>

      <div class="mt-8">
        {{#each results}}
          <div class="border border-gray-300 shadow rounded-md p-4 mb-4">
            <h3 class="text-xl font-bold mb-2"><span id="name">{{name}}</span></h3>
            <p class="text-gray-600 mb-1"><strong>Type:</strong> <span id="type">{{type}}</span></p>
            <p class="text-gray-600 mb-1"><strong>Muscle:</strong> <span id="muscle">{{muscle}}</span></p>
            <p class="text-gray-600 mb-1"><strong>Equipment:</strong> <span id="equipment">{{equipment}}</span></p>
            <p class="text-gray-600 mb-1"><strong>Difficulty:</strong> <span id="difficulty">{{difficulty}}</span></p>
            <p class="text-gray-600"><strong>Instructions:</strong> <span id="instructions">{{instructions}}</span></p>
            <button id="add-favorites" class="border">Add</button>
          </div>
        {{/each}}
      </div>
    </div
    `);

    const searchResultsHTML = searchResultsCards({ results: exerciseData }).toString();

    res.status(200).send(searchResultsHTML)
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

module.exports = router;
