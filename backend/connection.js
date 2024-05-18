const mongoose = require('mongoose');
const Config = require('./config');


const connection = async() => {
    try {
        const result = await mongoose.connect(Config.url);

        if (result){
            console.log(`connected to database`);
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = connection;