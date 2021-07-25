const { Sequelize } = require('sequelize')
require('dotenv').config()

const user = process.env.USER
const password = process.env.PASSWORD

const db = new Sequelize(`postgres://${user}:${password}@localhost:5432/omdb`, {
  logging: false,
})

module.exports = db
