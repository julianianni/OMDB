const express = require('express')
const router = express.Router()
const passport = require('passport')
const Users = require('../models/Users')
const Favourites = require('../models/favourites')
const { Op } = require('sequelize')

router.get('/all/:id', (req, res) => {
  Users.findAll({
    where: { id: { [Op.ne]: req.params.id } },
    include: {
      model: Favourites,
    },
  }).then((data) => res.send(data))
})
router.get('/all', (req, res) => {
  Users.findAll({
    include: {
      model: Favourites,
    },
  }).then((data) => res.send(data))
})

router.get('/me', (req, res) => {
  if (!req.user) res.sendStatus(401)
  console.log(req.user)
  res.send(req.user)
})

//agregar un usuario a la BD
router.post('/add', (req, res) => {
  Users.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err.errors[0].message)
      return res.send(err.errors[0].message)
    })
})
//update el estado a logged out
router.put(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/api/user/loginerror',
  }),
  (req, res) => {
    console.log('pase por el sign in')
    res.send(req.user)
  }
)

router.put('/loginerror', (req, res) => {
  res.send('credentials error')
})
router.put('/signout', (req, res) => {
  console.log('log out ok')
  req.logOut()
  res.sendStatus(200)
})

router.delete('/remove/:id', (req, res, next) => {
  Users.destroy({
    where: { id: req.params.id },
    include: Favourites,
    returning: true,
  })
    .then((user) => {
      return res.sendStatus(200)
    })
    .catch((err) => {
      next()
    })
})

module.exports = router
