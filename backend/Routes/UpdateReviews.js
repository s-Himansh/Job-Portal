const express = require('express');
const Router = express.Router();
const Job = require('../Models/Job')

Router.post('/updateReviews', async(req, res) => {
    try {
        // console.log(entered);
        // console.log(req.body);
        const jobId = req.body._id;
        const jobData = await Job.findOne({_id : jobId});
        if (!jobData){
            return res.json({success : false});
        }
        jobData.reviews = req.body.reviews;
        await jobData.save();
        return res.json({success : true});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;