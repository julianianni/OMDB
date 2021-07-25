const express = require('express')
const app = express()
const db = require('./models/db')
const port = 3001
const favroutes = require('./routes/favouritesRoutes')
const userroutes = require('./routes/userRoutes')
const authroutes = require('./routes/authRoutes')
const User = require('./models/users')
//passport
const initPassport = require('../src/utils/passport-config')
const initGooglePassport = require('../src/utils/google-passport')
const initFacebookPassport = require('../src/utils/facebook-passport')
const passport = require('passport')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

///end of imports

//middlewares
app.use(cors({ origin: '*' }))

initPassport(passport)
initGooglePassport(passport)
initFacebookPassport(passport)

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  User.findByPk(user.id)
    .then((user) => {
      done(null, user)
    })
    .catch(done)
})

app.use(
  sessions({
    secret: 'omdbp5',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())

app.use(express.json())

app.use('/api/favourites', favroutes)
app.use('/auth', authroutes)
app.use('/api/user', userroutes)

//routes

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
})
