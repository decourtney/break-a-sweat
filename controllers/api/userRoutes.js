const router = require('express').Router();
const { User, Exercise, UserFavorite, UserExercise } = require('../../models');
const withAuth = require('../../utils/auth');
const Handlebars = require('handlebars');

// WELCOME
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.offset = 0;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// HI
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username/password, please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username/password, please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.offset = 0;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// BYE
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// For updating User age, height, weight, bmi
router.post('/update-user-info', withAuth, async (req, res) => {
  try {
    const userUpdate = await User.update({
      ...req.body.userInfo
    },
      {
        where: {
          id: req.session.id
        }
      });

    res.status(200).json(userUpdate);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

router.get('/get-favorites', withAuth, async (req, res) => {
  // increase a users saved offset for pagination
  try {
    const favoritesData = await Exercise.findAll({
      include: {
        model: User,
        as: 'favorites_user',
        where: {id: req.session.user_id}
      },
      limit: 10
    });

    const favorites = favoritesData.map((favorite) => favorite.get({ plain: true }));

    const favoritesResultsCards = Handlebars.compile(`
    <button id="prev-button" class="paginate w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto"><path d="M15 18l-6-6 6-6"></path></svg>
    </button>

    {{#each results}}
    {{!-- Exercise Card --}}
    <div id="exercise-card" class="flex overflow-x-scroll" style="width: 80%">
      <div class="cursor-pointer inline-flex">
        <div class="w-64 h-64 bg-gray-100 shadow-lg rounded-lg p-6 pointer-events-none" id="card1">
          <div class="">
            <h2 class="text-lg font-medium mb-4 user-select-none">{{name}}</h2>
            <p class="text-gray-600">{{type}}</p>
          </div>
        </div>
      </div>

      {{!-- Details Card (initially hidden) --}}
      <div id="overlay" class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
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

    <button id="next-button" class="paginate w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto"><path d="M9 18l6-6-6-6"></path></svg>
    </button>
    `);

    const favoritesResultsHTML = favoritesResultsCards({results: favorites})

    res.status(200).json(favoritesResultsHTML);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

// For adding an exercise to the users favorites
router.post('/add-favorite', withAuth, async (req, res) => {
  try {
    const newFavorite = {
      user_id: req.session.id,
      exercise: req.body
    };

    const userFavorite = await User.create({
      user_favorites: [newFavorite]
    },
      {
        include: [{
          association: User.user_favorites,
          include: [Exercise]
        }]
      });

    res.status(200).json(userFavorite);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

// For adding post-exercise info for a users favorite
router.post('/add-exercise-info', withAuth, async (req, res) => {
  try {
    const newExercise = await UserExercise.create({
      user_id: req.session.id,
      ...req.body.exerciseInfo // Will likely have to deconstruct because the body will probably contain the Exercise info necessary for updating the Exercise table
    });

    const exercise = await Exercise.findOne({ where: { name: req.body.exerciseInfo.name } });
    await newExercise.addExercise(exercise);

    res.status(200).json(exerciseInfo);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

module.exports = router;
