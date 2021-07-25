const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('./db')
const Favourites = require('./favourites')
const bcrypt = require('bcrypt')
class Users extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt)
  }
}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      defaultValue: 'omdb',
    },
    email: {
      type: DataTypes.STRING,
    },

    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'Users',
  }
)
// hash pass
Users.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt
      return user.hash(user.password, salt)
    })
    .then((hash) => {
      user.password = hash
    })
})

Users.hasMany(Favourites)
Favourites.belongsTo(Users)

module.exports = Users
