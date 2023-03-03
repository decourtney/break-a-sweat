const router = require('express').Router();
const { Exercise, User, UserFavorite } = require('../models');
const withAuth = require('../utils/auth');
const { getExercises, getRandomExercises } = require('../utils/apiService');

// Root Route
// router.get('/', async (req, res) => {
//   try {

//     // Load Homepage
//     res.render('homepage', { 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(404).end();
//   }
// });

// This route is used for testing Data pulls
// Favorites right now
router.get('/', withAuth, async (req, res) => {
  try {
    const randoms = await getRandomExercises();
    if (!randoms) randoms = { name: `Sorry. I don't have any suggestions` }

    // const favoritesData = await Exercise.findAll({
    //   include: {
    //     model: User,
    //     as: 'favorites_user',
    //     where: {id: req.session.user_id}
    //   },
    //   limit: 10
    // })

    // const favorites = favoritesData.map((favorite) => favorite.get({ plain: true }));

    // console.log(favorites);
    // console.log(randoms);

    res.render('profile', {
      // favorites,
      randoms,
      partial: 'favorites-details',
      logged_in: req.session.logged_in
    })
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {


    res.render('profile', {
      exercises,
      partial: 'profile-main-details',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/favorites', withAuth, async (req, res) => {
  try {
    const randoms = await getRandomExercises();
    // console.log(exercises);

    const favoritesData = await User.findByPk(3, {
      include: {
        model: Exercise,
        attributes: ['id', 'name', 'type'],
        as: 'user_favorites',
      }
    });

    const favorites = favoritesData.user_favorites.map((favorite) => favorite.get({ plain: true }));

    // console.log(favorites);

    res.render('profile', {
      favorites,
      randoms,
      partial: 'favorites-details',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/charts', withAuth, async (req, res) => {
  try {


    res.render('profile', {
      partial: 'charts-details.handlebars',
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
