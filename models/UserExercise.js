const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserExercise extends Model { }

UserExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Improper date format - YYYY-MM-DD'
        }
      }
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userexercise',
  }
);

module.exports = UserExercise;