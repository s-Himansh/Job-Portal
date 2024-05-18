const express = require('express');
const User = require('../Models/User');
const Router = express.Router();

Router.post('/updateUser', async(req, res) => {
    try {
        const updateUserId = req.body.userId;
        const userData = await User.findById(updateUserId);

        if (!userData){
            return res.json({success : false});
        }

        userData.set(req.body);
        await userData.save();

        return res.json({success : true, userData});

    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;