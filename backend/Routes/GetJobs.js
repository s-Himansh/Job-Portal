const express = require('express');
const Job = require('../Models/Job');
const Router = express.Router();

Router.get('/getJobs', async(req, res) => {
    try {
        const data = await Job.find();
        return res.json({success : true, data});
    } catch (error) {
        console.log(error.message);
        return res.json({success : false});
    }
});

module.exports = Router;