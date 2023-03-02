const router = require('express').Router();
const { User, Exercise, UserFavorite, UserExercise } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.update('/update-user-info', withAuth, async (req, res) => {
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

router.post('/add-exercise-info', withAuth, async (req, res) => {
  try {
    const newExercise = await UserExercise.create({
      user_id: req.session.id,
      ...req.body.exerciseInfo // Will likely have to deconstruct because the body will probably contain the Exercise info necessary for updating the Exercise table
    });

    const exercise = await Exercise.findOne({ where:{name: req.body.exerciseInfo.name}});
    await newExercise.addExercise(exercise);
    
    res.status(200).json(exerciseInfo);
  } catch (err) {
    // res.status(500).json(err);
    console.error(err);
    res.status(500).send({ error: 'An error occurred while trying to add to favorites.' });
  }
});

module.exports = router;
