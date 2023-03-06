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
    // console.log(err);
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

// Get the users favorited exercises from the db
router.post('/get-favorites', withAuth, async (req, res) => {
  try {
    const favoritesData = await Exercise.findAll({
      include: {
        model: User,
        as: 'favorites_user',
        where: { id: req.session.user_id }
      },
      limit: 5,
      offset: req.body.offset
    });

    let favorites = favoritesData.map((favorite) => favorite.get({ plain: true }));
    let eol = false;

    // console.log(favorites);
    if (favorites.length <= 0) {
      // console.log('NO MORE EXERCISES!');
      eol = true;
      favorites = [
        {
          id: '',
          name: 'End of Line',
          type: `You don't have anymore favorited exercises.`,
          muscle: '',
          equipment: '',
          difficulty: '',
          instructions: '',
          user_exercise_id: null,
          favorites_user: null
        }
      ]
    }

    const favoritesResultsCards = Handlebars.compile(`
    <button id="prev-button" data-offset="0" class="paginate favorites w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 mr-4">
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

    <button id="next-button" data-offset="0" class="paginate favorites w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 ml-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto my-auto pointer-events-none"><path d="M9 18l6-6-6-6"></path></svg>
    </button>
    `);

    const favoritesResultsHTML = favoritesResultsCards({ results: favorites })

    res.status(200).json({newHTML: favoritesResultsHTML, eol: eol});
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

// For adding an exercise to the users favorites
router.post('/add-favorite', withAuth, async (req, res) => {
  const favInfo = req.body.favInfo;
  // console.log('This is the favInfo: ' + favInfo.name);

  try {
    const exercise = await Exercise.findOne({ where: { name: favInfo.name } });
    // console.log('Return from exercise.findone: ' + exercise)

    if (exercise) {
      const favorite = await UserFavorite.findOne({ where: { user_id: req.session.user_id, exercise_id: exercise.id } });
      // console.log('Return from userfavorite.findone: ' + favorite)

      if (!favorite) {
        // Exercise already exists and not in favorites then add
        // console.log('')
        const newFavorite = await UserFavorite.create({
          userId: req.session.user_id,
          exerciseId: exercise.id
        });

        return res.status(201).json({ favorite: newFavorite });
      }

      return res.status(201).send('That exercise is already favorited.');
    } else {
      // Exercise doesn't exist, create it and then create a new favorite object and associate it with the user
      // console.log('Exercise or Favorite doesnt exist, so creating new')
      const newExercise = await Exercise.create({ ...favInfo });
      const newFavorite = await UserFavorite.create({
        userId: req.session.user_id,
        exerciseId: newExercise.id
      });

      return res.status(201).json({ favorite: newFavorite });
    }
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

// For adding post-exercise info to a users favorited exercise
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
