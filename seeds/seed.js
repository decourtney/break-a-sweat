const sequelize = require('../config/connection');
const { User, Exercise, UserFavorite, UserExercise } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');
const userExerciseData = require('./userExerciseData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const exercises = await Exercise.bulkCreate(exerciseData, {
    returning: true,
  })

  for (const exercise of exercises) {
    await UserFavorite.create({
      user_id: users[Math.floor(Math.random() * users.length)].id,
      exercise_id: exercise.id
     
    });
  }

  const userExercises = await UserExercise.bulkCreate(userExerciseData, {
    returning: true,
  })

  process.exit(0);
};

seedDatabase();