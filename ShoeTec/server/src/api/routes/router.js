const express = require('express')
const multer = require('multer')
const usersController = require('../controller/userController')
const commentController = require('../controller/commentController')
const tenisController = require('../controller/tenisController')
const userMiddleware = require('../middleware/userMiddleware')
const tenisMiddleware = require('../middleware/tenisMiddleware')
const router = express.Router()


router.get('/', (req, res)=>{
    res.send('Hello World')
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../assets');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


//User routes
router.get('/users', usersController.getUsers) //Proteger
router.post('/users', userMiddleware.validateInput, usersController.setUsers)
router.delete('/users/:id', usersController.deleteUsers) //Proteger
router.post('/editUser', usersController.updatUser)
router.get('/getUser/:id', usersController.getSpecificUser)
router.get('/getUsers', usersController.getAllUsers);
router.post('/updateAdminStatus', usersController.updateAdminStatus);
router.post('/deleteUserId', usersController.deleteUserId);
router.post('/users/login', usersController.loginUser)
router.get('/userLogout', usersController.logoutUser)
router.get('/checkSession', usersController.checkSession)
router.post('uploadProfilePicture', upload.single('profilePicture'), usersController.uploadUserPicture)

router.post('/comment',  commentController.createComment)
router.get("/topComments/:id", commentController.getTopComment)
router.get("/childComments/:id", commentController.getChildComment)
router.get("/getAllComments/:id", commentController.getAllComments)
router.get("/deleteComment/:commentId", commentController.deleteComments)
router.get('/commentsByReviewer/:reviewerId', commentController.getCommentsByReviewerId);

router.post('/createTenis', tenisController.creatTenis)
router.get('/tenis/:limit',  tenisController.getTenis)
router.get('/tenisId/:id', tenisController.getTenisById)
router.get('/searchTenis/', tenisController.searchTenis)

module.exports = router