// submitApplication.js (in routes directory)

const express = require('express');
const Router = express.Router();
const multer = require('multer');
const Application = require('../Models/Application'); // Import Application schema
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // File uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 30 * 1024 * 1024 } });

Router.post('/submitApplication', upload.single('resume'), async (req, res) => {
    try {
        const userData = JSON.parse(req.body.userData);
        const jobData = JSON.parse(req.body.jobData);
        const resumePath = req.file.path; // Path to the uploaded resume file

        // Create a new application document
        const application = new Application({
            userData: userData,
            jobData: jobData,
            resumePath: resumePath
        });

        // Save the application data to the database
        await application.save();

        // Respond with success message
        res.status(200).json({ success: true, message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
    }
});

module.exports = Router;
