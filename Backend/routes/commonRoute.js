const express= require('express');
const router = express.Router()

const auth =require('../middlewares/authMiddleware')
const categoryController =require('../controllers/categoryController')
const {}= require('../middlewares/adminMiddleware')
const { categoryAddValidator,categoryDeleteValidator,categoryUpdateValidator, createPostValidator ,deletePostValidator,updatePostValidator}= require('../helpers/adminValidator');

const postController = require ('../controllers/postController')
//category routes
router.post('/add-category',auth,categoryAddValidator, categoryController.addCategory)
router.get('/get-category',auth, categoryController.getCategory)
router.post('/delete-category',auth,categoryDeleteValidator, categoryController.deleteCategory)
router.post('/update-category',auth,categoryUpdateValidator, categoryController.updateCategory)


//post routes
router.post('/create-post',auth,createPostValidator, postController.createPost)
router.get('/get-post',auth, postController.getPost)
router.post('/delete-post',auth,deletePostValidator, postController.deletePost)
router.post('/update-post',auth,updatePostValidator, postController.updatePost)

module.exports = router;
