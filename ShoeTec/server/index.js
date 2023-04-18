const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')

const PORT = 3001


app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    console.log("Hello :)")
})

app.get('/', (req, res)=>{
    res.status(200).send('Hello World')
})

app.post('/criarUsuario', (req, res)=>{

})

