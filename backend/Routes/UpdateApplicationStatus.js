const express = require('express');
const Router = express.Router();
const Application = require('../Models/Application');

Router.post('/updateApplication/:data', async(req, res) => {
    try {
        const data = req.params.data;
        // console.log(data.substring(0, 24));
        // console.log(data.substring(24, data.length));
        const app_id = data.substring(0, 24);
        const status = data.substring(24, data.length);

        const applicationData = await Application.findOne({_id : app_id});
        // console.log('application data is ', applicationData);
        if (applicationData === null || status === null){
            return res.json({success : false});
        }

        applicationData.status = status;
        await applicationData.save();

        return res.json({success : true});

    } catch (error) {
        console.log(error.messagge);
        return res.json({success : false});
    }
});


module.exports = Router;