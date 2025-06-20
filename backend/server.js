const express = require('express')
const app = express()
const cors = require("cors")
const PORT = 8080

app.use(cors());

const matchesRouter = require('./routes/matches')
app.use('/matches', matchesRouter)
app.listen(PORT)