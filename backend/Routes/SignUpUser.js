const express = require('express');
const Router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

Router.post('/signup', [body('email', 'Incorrect Email').isEmail(), body('password', 'Incorrect Password').isLength({ min: 5 }), body('firstName').isLength({ min: 3 })], async(req, res) => {
    const someError = validationResult(req);
    if (!someError.isEmpty()){
        return res.status(400).json({ someError: someError.array() });
    }
    if (!req.body.termsChecked){
        return res.json({success : false});
    }

    const salt = await bcrypt.genSalt(12);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : securePassword,
            userType : req.body.userType,
            termsChecked : req.body.termsChecked
        })
         // console.log('new user made is ', newUser);
        return res.json({success : true});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }

});

module.exports = Router;