const pp = require('passport')
const ppGoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

pp.serializeUser((user, done) => {
  done(null, user.id)
})

pp.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

pp.use(
  new ppGoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          done(null, user)
        } else {
          User({ googleId: profile.id }).save().then(newUser => {
            done(null, newUser)
          })
        }
      })
    }
  )
)
