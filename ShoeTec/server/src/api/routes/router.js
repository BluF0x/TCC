const express = require('express')
const usersController = require('../controller/userController')
const userMiddleware = require('../middleware/userMiddleware')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Hello World')
})

router.get('/users', usersController.getUsers)
// router.get('/user/:id', usersController.getSpecificUser) 
router.post('/users', userMiddleware.validateInput, usersController.setUsers)
router.delete('/users/:id', usersController.deleteUsers)

module.exports = router