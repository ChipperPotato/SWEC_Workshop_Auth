// Instantiating a Port
const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10

app.use(express.json())

app.get('/', (req, res) => {
  return res.send('<h1>Potato</h1>')
})

app.post('/signup/', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, function(err, hash){
    if (err) return res.sendStatus(500)
      // We should be storing in DB
      res.json({username, hash})
  })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = {name : username}

  // Compare hash of passwd

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken:accessToken})
})

// Listen to a port
app.listen(8980, (error) => {
  if (error) return console.log(`Server failed to start ${error}`)
  console.log("Server is listening");
})

//
