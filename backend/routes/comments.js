const express = require('express');
const router = express.Router();
const commentcontroller = require('../controllers/commentcontroller');
const auth=require('../utils/verifyToken');


router.get('/:blogId', auth.verifytoken, commentcontroller.getAllComments);
router.post('/new', auth.verifytoken, commentcontroller.newComment);


module.exports = router;
