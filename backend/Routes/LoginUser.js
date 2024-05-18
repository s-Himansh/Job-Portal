const express = require('express');
const User = require('../Models/User');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config');

Router.post('/login', async(req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({email});
        if (!findUser){
            res.status(400).json({error : "Incorrect Credentials! Please try again"});
        }
        const passCmp = await bcrypt.compare(req.body.password, findUser.password);
        if (!passCmp){
            res.status(400).json({error : "Incorrect Credentials! Please try again"});
        }
        const data = { user : {_id : findUser._id} };
        const authToken = jwt.sign(data, Config.secret);

        return res.json({success : true, authToken, findUser});

    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});


module.exports = Router;