const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('../utils/config');


exports.signup=catchAsync(async (req,res,next) => {

    const user=await User.findOne({emailId: req.body.emailId});

    if(user) {
        return next(new appError(`User with Email id ${req.body.emailId} already exists!!!`,403));
    }

    let newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        emailId: req.body.emailId,
        mobNum: req.body.mobNum
    });

    await newUser.save();

    res.status(200).json(newUser);
});


exports.login=catchAsync(async (req,res,next) => {

    const email=req.body.emailId;
    const pass=req.body.password;

    const user=await User.findOne({emailId: email});

    if(!user) {
        return next(new appError('User not found!!!!',404));
    }

    const isMatched=bcrypt.compareSync(pass, user.password);

    if(!isMatched) {
        return next(new appError('Incorrect password!!!',403));
    }


    const accesstoken = jwt.sign(
        {userId:user._id},
        config.secretKey,
        {expiresIn:60*60} //expires in 1 hour
    );

    res.status(200).json({
        message:'logged in successfully!!!',
        accesstoken,
        user
    });
});



exports.refresh=catchAsync(async (req,res,next) => {


    const user=await User.findById(req.userId);

    if(!user) {
        return next(new appError('User not found!!!!',404));
    }


    const accesstoken = jwt.sign(
        {userId:user._id},
        config.secretKey,
        {expiresIn:60*60} //expires in 1 hour
    );

    res.status(200).json({
        message:'logged in successfully!!!',
        accesstoken,
        user
    });
});
