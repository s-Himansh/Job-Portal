const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstName : {
        type : String,
        required : true
   },
   lastName : {
        type : String,
        required : true
   },
   email : {
        type : String,
        required : true
   },
   password : {
        type : String,
        required : true
   },
   userType : {
        type : String,
        required : true
   },
   termsChecked : {
        type : Boolean,
        required : true
   }
});


module.exports = mongoose.model('jobUser', userSchema);