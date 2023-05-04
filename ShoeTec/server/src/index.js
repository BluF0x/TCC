const cors = require('cors')
const app = require('./app')
require('dotenv').config()

const PORT = process.env.SERVER_PORT || 3001

app.use(cors())

app.listen(PORT, ()=>{console.log(`Hello World :D \nListening to port ${PORT}`)})