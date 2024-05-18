const express = require('express');
const Router = express.Router();
const Application = require('../Models/Application');

Router.post('/getUserApplications/:userId', async(req, res) => {

    try {
        const userId = req.params.userId;
        const applications = await Application.find({'userData._id' : userId});
        // console.log('found user id is ', userId);
        if (!applications){
            return res.json({success : false});
        }

        return res.json({success : true, applications});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }

});

module.exports = Router;