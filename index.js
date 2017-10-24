const PORT = process.env.PORT || 5000

const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookie = require('cookie-session')
const pp = require('passport')

const app = express()
app.use(cookie({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] }))
app.use(pp.initialize())
app.use(pp.session())

require('./models/user')
require('./services/passport')

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

mongoose.connect(keys.mongoURI)

app.listen(PORT)
console.log('App started on port ' + PORT)
