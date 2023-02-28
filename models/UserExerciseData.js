const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserExerciseData extends Model { }

UserExerciseData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
        max: 1000,
      }
    },
    weights: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: {
          arge: [0, 1000],
          msg: 'Weight must be between 0 and 1000'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      }
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'exercise',
        key: 'id',
        unique: false,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userexercisedata',
  }
);

module.exports = UserExerciseData;