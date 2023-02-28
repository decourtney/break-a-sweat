const sequelize = require('../config/connection');
const { User, Exercise, UserFavorite } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');

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

  process.exit(0);
};

seedDatabase();