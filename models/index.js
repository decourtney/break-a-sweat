const User = require('./User');
const Exercise = require('./Exercise');
const UserFavorite = require('./UserFavorite');
const UserExercise = require('./UserExercise');

User.belongsToMany(Exercise, {
  through: {
    model: UserFavorite,
  },
  as: 'user_favorites'
});

Exercise.belongsToMany(User, {
  through: {
    model: UserFavorite,
  },
  as: 'favorites_user'
});

User.hasOne(UserExercise, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserExercise.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserExercise.hasMany(Exercise, {
  foreignKey: 'user_exercise_data_id',
  onDelete: 'CASCADE'
});

Exercise.belongsToMany(UserExercise, {
  through: 'ExerciseDataUser',
  foreignKey: 'exercise_id',
  otherKey: 'user_exercise_data_id'
});

module.exports = { User, Exercise, UserFavorite, UserExercise };
