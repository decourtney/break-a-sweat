const router = require('express').Router();
const { Exercise, User, UserFavorite } = require('../models');
const withAuth = require('../utils/auth');
const getRandomExercises = require('../utils/apiService');

// Root Route
router.get('/', async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.redirect('/login');
    }

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(404).end();
  }
});

// This route is used for testing Data pulls
// router.get('/', async (req, res) => {
//   try {
//     const exercises = await getRandomExercises();

//     // console.log(exercises)

//     res.render('profile', {
//       exercises,
//       partial: 'profile-main-details',
//       logged_in: req.session.logged_in
//     })
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/profile', withAuth, async (req, res) => {
  try {
    const exercises = await getRandomExercises();

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
      partial: 'favorites-details',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
