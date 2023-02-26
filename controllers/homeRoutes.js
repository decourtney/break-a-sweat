const router = require('express').Router();
const { Exercise, User, UserFavorite } = require('../models');
const withAuth = require('../utils/auth');

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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) =>
{
  try
  {




    res.render('profile', {
      partial: 'profile-main-details',
      // ...user,
      logged_in: req.session.logged_in
    });
  } catch (err)
  {
    res.status(500).json(err);
  }
});

router.get('/profle/favorites', withAuth, async (req, res) =>
{
  try
  {




    req.render('profile', {
      partial: 'favorites-details',
      logged_in: req.session.logged_in
    })
  } catch (err)
  {
    res.status(500).json(err);
  }
})

router.get

router.get('/login', (req, res) =>
{
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in)
  {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
