// git commands must be made from ROOT of project
// BUT, must run project, and run npm commands, from SERVER folder

require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000

const db = require('./db')
const tableauRouter = require('./routes/tableau-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error yo:'))

app.get('/', (req, res) => {/* return */ res.send('Hello World')})

app.use('/api', tableauRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort} yo`))

