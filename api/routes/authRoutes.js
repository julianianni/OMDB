const express = require('express')
const router = express.Router()
const passport = require('passport')

//facebook
router.get('/facebook', passport.authenticate('facebook'))

router.get(
  '/facebook/secret',
  passport.authenticate('facebook', { failureRedirect: '/auth/fail' }),
  function (req, res) {
    console.log('en facebook strategy adentro')
    res.redirect('http://localhost:3000/')
  }
)

//google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/fail' }),
  function (req, res) {
    res.redirect('http://localhost:3000/')
  }
)
///
router.get('/fail', (req, res) => {
  res.send('Failed attempt')
})
router.get('/good', (req, res) => {
  res.send('Failed attempt')
})

module.exports = router
