const express = require('express');
const Router = express.Router();
const Job = require('../Models/Job');

Router.post('/getJobDesc', async(req, res) => {
    try {
        // console.log('job id is ', req.body);
        const jobData = await Job.findOne({_id : req.body.jobId});
        if (!jobData){
            return res.json({success : false});
        }

        return res.json({success : true, jobData});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;