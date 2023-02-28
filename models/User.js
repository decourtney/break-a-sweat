const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        not: /[-!$ %^&* ()_ +| ~=`{}\[\]:";'<>?,.\/]/,
        msg: 'Username can not contain special characters.'
      }
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
        msg: 'Password must be at least 8 characters'
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min:16,
        max: 120,
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat:{
          args:{
            min: 0,
            max: 1000,
          },
          msg: 'Weight must be between 0 and 1000',
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
        max: 120,
      }
    },
    bmi: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true,
        min: 0,
        max: 100,
      }
    }   
  },
  {
    hooks: {
      beforeCreate: async (newUserData) =>
      {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) =>
      {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
