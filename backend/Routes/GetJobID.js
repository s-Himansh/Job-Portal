const express = require('express');
const Router = express.Router();
const Job = require('../Models/Job');

Router.post('/getJobId', async(req, res) =>{
    try{
        const toFind = req.body;
        const jobData = await Job.findOne({jobProfile : toFind.jobProfile, companyName : toFind.companyName, location : toFind.location, duration : toFind.duration, startDate : toFind.startDate, stipend : toFind.stipend});

        if (!jobData){
            return res.json({success : false});
        }
        return res.json({success : true, job_id : jobData._id});
    }catch(error){
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;