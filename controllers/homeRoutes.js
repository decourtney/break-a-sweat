const router = require('express').Router();
const { Exercise, User, UserFavorite } = require('../models');
const withAuth = require('../utils/auth');
const { getExercises, getRandomExercises } = require('../utils/apiService');
const moment = require('moment');

// Root Route
router.get('/', async (req, res) => {
  try {

    // Load Homepage
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(404).end();
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    res.render('profile', {
      partial: 'profile-main-details',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/profile/favorites', withAuth, async (req, res) => {
  try {

    res.render('profile', {
      partial: 'favorites-details',
      logged_in: req.session.logged_in
    })
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while searching for exercises.' });
  }
});

router.get('/profile/analytics', withAuth, async (req, res) => {
  try {


    res.render('profile', {
      partial: 'analytics-details',
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

router.get('/profile/calendar', function(req, res) {
  // Get the year and month from the query string
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  // Render the calendar using Handlebars
  res.render('profile', { partial: 'calendar',year, month});
});

module.exports = router;
