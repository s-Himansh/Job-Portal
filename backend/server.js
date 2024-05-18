const express = require('express');
const Router = express();
const Config = require('./config');
const connection = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');


// Routes
const SignUpUser = require('./Routes/SignUpUser');
const LoginUser = require('./Routes/LoginUser');
const JobProfiles = require('./Routes/JobProfiles');
const GetJobs = require('./Routes/GetJobs');
const GetJobId = require('./Routes/GetJobID');
const GetJobDesc = require('./Routes/GetJobDesc');
const GetUser = require('./Routes/GetUser');
const UpdateUserDetails = require('./Routes/UpdateUserDetails');
const SubmitApplication = require('./Routes/SubmitApplication');
const GetApplications = require('./Routes/GetApplications');
const FetchApplications = require('./Routes/FetchApplications');
const UpdateApplicationStatus = require('./Routes/UpdateApplicationStatus');
const ChatRoutes = require('./Routes/ChatRoutes');
const UpdateReviews = require('./Routes/UpdateReviews');

connection();
Router.use(cors());
 
Router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  
Router.use(bodyParser.json({limit: '50mb'}));
Router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
Router.use(express.json());
Router.use('/uploads', express.static('uploads'));


Router.use('/', SignUpUser);
Router.use('/', LoginUser);
Router.use('/', JobProfiles);
Router.use('/', GetJobs);
Router.use('/', GetJobId);
Router.use('/', GetJobDesc);
Router.use('/', GetUser);
Router.use('/', UpdateUserDetails);
Router.use('/', SubmitApplication);
Router.use('/', GetApplications);
Router.use('/', FetchApplications);
Router.use('/', UpdateApplicationStatus);
Router.use('/', ChatRoutes);
Router.use('/', UpdateReviews);



Router.listen(Config.PORT, (req, res) => {
    console.log(`app listening at ${Config.PORT}`);
});
