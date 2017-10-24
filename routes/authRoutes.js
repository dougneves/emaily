const pp = require('passport')

module.exports = app => {
  app.get(
    '/auth/google',
    pp.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get('/auth/google/callback', pp.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  })

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
