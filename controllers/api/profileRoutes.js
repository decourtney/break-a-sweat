const router = require('express').Router();
const { User, Exercise, UserFavorite } = require('../../models');
const withAuth = require('../../utils/auth');
const getExercises = require('../../utils/apiService');
const Handlebars = require('handlebars')

router.get('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const userFavorites = await UserFavorite.

      res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/bmi-chart-details', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(re.session.user_id);

  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }

});

router.post('/search', withAuth, async (req, res) => {
  try {
    const exerciseData = await getExercises(req.body.param, req.body.val, req.body.offset);

    const searchResultsCards = Handlebars.compile(`
    <h2 class="text-lg font-bold">Search Results</h2>
    {{#each results}}
      <div class="border border-gray-300 shadow rounded-md p-4 mb-4">
        <h3 class="text-xl font-bold mb-2">{{name}}</h3>
        <p class="text-gray-600 mb-1"><strong>Muscle:</strong> {{muscle}}</p>
        <p class="text-gray-600 mb-1"><strong>Equipment:</strong> {{equipment}}</p>
        <p class="text-gray-600 mb-1"><strong>Difficulty:</strong> {{difficulty}}</p>
        <p class="text-gray-600"><strong>Instructions:</strong> {{instructions}}</p>
      </div>
    {{/each}}
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
