const User = require('./User');
const Exercise = require('./Exercise');
const UserFavorite = require('./UserFavorite');

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

module.exports = { User, Exercise, UserFavorite };
