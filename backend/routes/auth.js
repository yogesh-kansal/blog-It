const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller');
const auth=require('../utils/verifyToken');

//signup, login
router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);

router.get('/refresh', auth.verifytoken, authcontroller.refresh);

module.exports = router;
