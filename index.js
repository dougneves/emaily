const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
})

app.listen(PORT)
