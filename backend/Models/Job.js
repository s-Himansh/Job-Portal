const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobProfile : {
        type : String, 
        required :true
    },
    companyName : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    stipend : {
        type : String,
        required : true
    },
    aboutTheJob : {
        type : String,
        required : true
    },
    keyResponsibilities : {
        type : Array,
        required : true
    },
    skillsRequired : {
        type : Array,
        required : true
    },
    whoCanApply : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    perks : {
        type : String,
        required : true
    },
    vacancies : {
        type : String,
        required : true
    },
    aboutCompany : {
        type : String,
        required : true
    },
    rec_id : {
        type : String,
        required : true
    },
    reviews : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model('jobs', jobSchema);


/*

    import React from 'react'
import { Link } from 'react-router-dom'
import SideNavbar from './SideNavbar'

function CompanyReviews() {
    return (
        <div className='bg-gradient-to-br from-blue-100 to-green-100 min-h-screen'>
            {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                <Link to='/'>
                    Back
                </Link>
            </div>
            
            </div>
        )
    }
    
    export default CompanyReviews
    
    
    This is my component. Just take some random company data with given fields
    
    this is the schema
    
    const mongoose = require('mongoose');
    
    
    const jobSchema = new mongoose.Schema({
        jobProfile : {
            type : String, 
            required :true
        },
        companyName : {
            type : String,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        duration : {
            type : String,
            required : true
        },
        startDate : {
            type : Date,
            required : true
        },
        stipend : {
            type : String,
            required : true
        },
        aboutTheJob : {
            type : String,
            required : true
        },
        keyResponsibilities : {
            type : Array,
            required : true
        },
        skillsRequired : {
            type : Array,
            required : true
        },
        whoCanApply : {
            type : String,
            required : true
        },
        salary : {
            type : String,
            required : true
        },
        perks : {
            type : String,
            required : true
        },
        vacancies : {
            type : String,
            required : true
        },
        aboutCompany : {
            type : String,
            required : true
        },
        rec_id : {
            type : String,
            required : true
        }
    });
    
    module.exports = mongoose.model('jobs', jobSchema);
    
    and we will create a new schema with job_id, reviews array which consists of key as space seperated 

*/