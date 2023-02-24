const User = require('./User');
const Exercise = require('./Exercise');
const UserExercise = require('./UserExercise');

User.belongsToMany(Exercise, {
  through: {
    model: UserExercise,
  },
  as: 'user_exercises'
});

Exercise.belongsToMany(User, {
    through: {
      model: UserExercise,
    },
    as: 'exercised_users'
});

module.exports = { User, Exercise };
