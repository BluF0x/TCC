const express = require('express')
const usersController = require('../controller/userController')
const commentController = require('../controller/commentController')
const tenisController = require('../controller/tenisController')
const userMiddleware = require('../middleware/userMiddleware')
const tenisMiddleware = require('../middleware/tenisMiddleware')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Hello World')
})

//User routes
router.get('/users', usersController.getUsers) //Proteger
router.post('/users', userMiddleware.validateInput, usersController.setUsers)
router.delete('/users/:id', usersController.deleteUsers) //Proteger
router.post('/users/login', usersController.loginUser)

router.post('/comment',  commentController.createComment)

router.get('/tenis/:limit',  tenisController.getTenis)
router.get('/tenisId/:id', tenisController.getTenisById)
router.post('/searchTenis', tenisController.searchTenis)

module.exports = router