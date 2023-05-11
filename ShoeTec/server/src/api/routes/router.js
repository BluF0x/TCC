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

router.get('/users', usersController.getUsers)
// router.get('/user/:id', usersController.getSpecificUser) 
router.post('/users', userMiddleware.validateInput, usersController.setUsers)
router.delete('/users/:id', usersController.deleteUsers)

router.post('/comment',  commentController.createComment)

router.get('/tenis',  tenisController.getTenis)
router.get('/tenisId/:id', tenisController.getTenisById)

module.exports = router