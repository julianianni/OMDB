const Users = require('./users')
const Favourites = require('./favourites')

const associations = () => {
  Users.hasMany(Favourites)
  Favourites.belongsTo(Users)
}

associations()

module.exports = associations
