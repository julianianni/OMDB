const User = require('../../api/models/users')
var GoogleStrategy = require('passport-google-oauth20').Strategy

function initGooglePassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '58300348440-i3eg7obg94df9lirshgoo5412lf7qv66.apps.googleusercontent.com',
        clientSecret: '6KKSQrNUCI0tITWhQOSIeix-',
        callbackURL: 'http://localhost:3001/auth/google/callback',
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
          where: {
            username: profile.displayName,
            name: profile.displayName,
            // password: profile.id,
          },
        }).then((user) => {
          return cb(null, user[0])
        })
      }
    )
  )
  //serialize
}

module.exports = initGooglePassport
