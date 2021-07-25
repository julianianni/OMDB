const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('./db')

class Favourites extends Model {}

Favourites.init(
  {
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Favourites',
  }
)

module.exports = Favourites
