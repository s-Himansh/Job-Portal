const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
    userData: { 
        type: Object, 
        required: true 
    },
    jobData: { 
        type: Object, 
        required: true 
    },
    status : {
        type : String,
        default : 'Still Processing',
        required : true
    },
    resumePath: { 
        type: String, 
        required: true 
    }
})


module.exports = mongoose.model('Application', applySchema);