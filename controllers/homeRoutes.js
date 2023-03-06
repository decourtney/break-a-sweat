const router = require('express').Router();
const { Exercise, User, UserFavorite } = require('../models');
const withAuth = require('../utils/auth');
const { getExercises, getRandomExercises } = require('../utils/apiService');
const moment = require('moment');

let events = [
  { title: 'Event 1', start: '2023-03-01', end: '2023-03-02', color: 'green' },
  { title: 'Event 2', start: '2023-03-05', end: '2023-03-07', color: 'blue' },
  { title: 'Event 3', start: '2023-03-15', end: '2023-03-17', color: 'red' }
];

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
router.get("/favorites",(req,res)=>{
  res.render("favorites")
})
// This route is used for testing Data pulls
// Favorites right now
// router.get('/', withAuth, async (req, res) => {
//   try {


//     // const favoritesData = await Exercise.findAll({
//     //   include: {
//     //     model: User,
//     //     as: 'favorites_user',
//     //     where: {id: req.session.user_id}
//     //   },
//     //   limit: 5
//     // })

//     // const favorites = favoritesData.map((favorite) => favorite.get({ plain: true }));

//     // console.log(favorites);
//     // console.log(randoms);

//     res.render('profile', {
//       // favorites,
//       // randoms,
//       partial: 'favorites-details',
//       logged_in: req.session.logged_in
//     })
//   } catch (err) {
//     // res.status(500).json(err);
//     console.error(err);
//     res.status(500).send({ error: 'An error occurred while searching for exercises.' });
//   }
// });

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

router.get('/profile/calendar', function(req, res) {
  // Get the year and month from the query string
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  const eventsForMonth = events.filter(function(event) {
    const eventDate = moment(event.start);
    return eventDate.year() === year && eventDate.month() === month - 1;
  });

  // Render the calendar using Handlebars
  res.render('profile', { partial: 'calendar',year, month, events: eventsForMonth});
});


// Handle POST requests to add events
router.post('/profile/calendar', function(req, res) {
  const title = req.body.title;
  const date = moment(req.body.date).format('YYYY-MM-DD');
  
  // Add the event to the events array
  addEvent(title, date);

  res.redirect('/profile/calendar');
});

// Define a function to add an event to the events array
function addEvent(title, date) {
  events.push({
    title: title,
    start: date,
    color: 'purple'
  });
}


module.exports = router,events;
