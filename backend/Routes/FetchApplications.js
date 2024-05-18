const express = require('express');
const Application = require('../Models/Application');
const Router = express.Router();

Router.post('/fetchapp/:jobId', async(req, res) => {
    try {
        const jobId = req.params.jobId;
        // console.log(jobId);
        const allApplications = await Application.find({'jobData._id' : jobId});

        if (!allApplications){
            return res.json({success : false});
        }
        // console.log(jobId);
        // console.log(allApplications);
        return res.json({success : true, allApplications});

    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;