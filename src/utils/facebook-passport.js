const User = require('../../api/models/users')

const FacebookStrategy = require('passport-facebook')

function initFacebookPassport(passport) {
  console.log('facebook estrategia')

  passport.use(
    new FacebookStrategy(
      {
        clientID: '840850603523870',
        clientSecret: 'c3c1ec8bee7aaa78813b6decba3fc9d1', //
        callbackURL: 'http://localhost:3001/auth/facebook/secret',
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

module.exports = initFacebookPassport
