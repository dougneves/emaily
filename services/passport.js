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
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })

      if (user) return done(null, user)
      const newUser = await User({ googleId: profile.id }).save()
      return done(null, newUser)
    }
  )
)
