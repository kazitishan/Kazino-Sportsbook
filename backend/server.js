const express = require('express')
const app = express()
const PORT = 3000

const matchesRouter = require('./routes/matches')
app.use('/matches', matchesRouter)
app.listen(PORT)