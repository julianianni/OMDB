const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Favourites = require('../models/favourites')
const User = require('../models/users')

//get all favourites from a user
router.get('/all/:id', (req, res) => {
  console.log('favroutes --> getting al favs from a usser')
  const { id } = req.params

  User.findAll({
    where: {
      id: id,
    },
    include: Favourites,
  })
    .then((data) => res.send(data))
    .catch(() => res.sendStatus(400))
})

router.post('/add', async (req, res) => {
  console.log('favroutes --> adding a favourite')
  //req.body = userid & movieId
  Favourites.findOrCreate({ where: req.body })
    .then((result) => {
      const data = result[0]
      const created = result[1]
      if (!created) res.send('favourite already in user')
      else res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})
//eliminar un favourito de un usuario
router.delete('/remove', (req, res) => {
  //   {
  //     "movieId": "tt3107288",
  //     "UserId": 1

  // }
  Favourites.destroy({ where: req.body, returning: true })
    .then((result) => {
      console.log('fav removed--->', result)
      if (result) return res.send('favourite removed')
      else return res.sendStatus(404)
    })
    .catch((err) => res.sendStatus(400))
})
//para borrar despues

router.get('/', (req, res) => {
  Favourites.findAll().then((data) => res.send(data))
})

module.exports = router
