const User = require('../../api/models/users')
const express = require('express')

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const app = express()

const hashPassword = (password) => {
  return bcrypt.hash(password, 10).then((hash) => hash)
}

function initPassport(passport) {
  //use
  passport.use(
    new localStrategy(function (username, password, done) {
      User.findOne({ where: { username } })
        .then((user) => {
          if (!user) {
            // user not found
            console.log('user not found')

            return done(null, false)
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              console.log('bad password')
              return done(null, false, { message: 'wrong password' }) // wrong password
            }

            return done(null, user, { message: 'log in ok' }) // success :D
          })
        })
        .catch(done) // done(err)
    })
  )

  //serialize
}

module.exports = initPassport
