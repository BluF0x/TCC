const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./api/routes/router')
const cors = require('cors')
const app = express()
const store = new session.MemoryStore()

const options = {
    origin: '*'
}

app.use(express.json())
app.use(cors(options))
app.use(cookieParser())

// 24 horas em ms 
const oneDay = 1000 * 60 * 60 * 24;
app.use(session(
    {
        secret: 'testKey1234', //Chave temporária
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: oneDay}

    }
))

// app.use((req, res, next) => {
//     console.log(`MEMORY STORE: ${store}`)
//     next()
// })

app.use(router)
module.exports = app
