const express = require('express');
const Router = express.Router();
const Job = require('../Models/Job');


Router.post('/jobs', async(req, res) => {
    // console.log(req.body);
    try{
        const jobData = await Job.create({
            jobProfile : req.body.jobProfile,
            companyName : req.body.companyName,
            location : req.body.location,
            duration : req.body.duration,
            startDate : req.body.startDate,
            stipend : req.body.stipend,
            aboutTheJob : req.body.aboutTheJob,
            keyResponsibilities : req.body.keyResponsibilities,
            skillsRequired : req.body.skillsRequired,
            whoCanApply : req.body.whoCanApply,
            salary : req.body.salary,
            perks : req.body.perks,
            vacancies : req.body.vacancies,
            aboutCompany : req.body.aboutCompany,
            rec_id : req.body.rec_id
        });

        res.json({success : true});
    }catch(error){
        console.log(error.message);
        res.json({success : false});
    }
});

module.exports = Router;