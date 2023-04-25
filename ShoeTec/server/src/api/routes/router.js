const express = require('express')
const usersController = require('../controller/userController')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Hello World')
})

router.get('/users', usersController.getUsers)
router.post('/users', usersController.setUsers)

module.exports = router