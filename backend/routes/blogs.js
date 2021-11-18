const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const auth=require('../utils/verifyToken');


router.get('/', auth.verifytoken, blogcontroller.getAllBlogs);
router.post('/new', auth.verifytoken, blogcontroller.newBlog);


router.get('/:blogId', auth.verifytoken, blogcontroller.getBlog);
router.patch('/:blogId', auth.verifytoken, blogcontroller.modifyBlog);
router.delete('/:blogId', auth.verifytoken, blogcontroller.deleteBlog);


module.exports = router;
