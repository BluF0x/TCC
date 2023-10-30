const express = require('express')
const multer = require('multer')
const usersController = require('../controller/userController')
const commentController = require('../controller/commentController')
const tenisController = require('../controller/tenisController')
const userMiddleware = require('../middleware/userMiddleware')
const tenisMiddleware = require('../middleware/tenisMiddleware')
const path = require('path');
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Hello World')
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/assets/images'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Add a unique suffix to the file name
  },
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB size limit
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
router.post('/uploadUserPicture', upload.single('image'), usersController.uploadPicture)

// Comment routes
router.post('/comment',  commentController.createComment)
router.get("/topComments/:id", commentController.getTopComment)
router.get("/childComments/:id", commentController.getChildComment)
router.get("/getAllComments/:id", commentController.getAllComments)
router.get("/deleteComment/:commentId", commentController.deleteComments)
router.get('/commentsByReviewer/:reviewerId', commentController.getCommentsByReviewerId);
router.get('/AllcommentsByReviewer/:reviewerId', commentController.getAllCommentsByReviewerId);

// Tenis routes
router.post('/createTenis', tenisController.creatTenis)
router.get('/tenis/:limit',  tenisController.getTenis)
router.get('/tenisId/:id', tenisController.getTenisById)
router.get('/searchTenis', tenisController.searchTenis)
router.post('/uploadImagesTenis', upload.array('images', 6), tenisController.uploadImages)

module.exports = router