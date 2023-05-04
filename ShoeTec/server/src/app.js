const express = require('express')
const router = require('./api/routes/router')
const cors = require('cors')
const app = express()

const options = {
    origin: '*'
}

app.use(express.json())
app.use(cors(options))
app.use(router)

module.exports = app
