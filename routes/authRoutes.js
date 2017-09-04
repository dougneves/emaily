const pp = require('passport')

module.exports = app => {
  app.get(
    '/auth/google',
    pp.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get('/auth/google/callback', pp.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
