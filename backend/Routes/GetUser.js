const express = require('express');
const User = require('../Models/User');
const Router = express.Router();


Router.post('/getUser', async(req ,res) => {
    try {
        const userData = await User.findOne({_id : req.body.userId});
        // console.log(req.body);
        if (!userData){
            return res.json({success : false});
        }

        return res.json({success : true, userData});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;