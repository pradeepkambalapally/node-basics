
const mongoose = require('mongoose');

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected Successfully");
    }catch(e){
        console.error("Mongoose Connection Failed", e);;
        
    }
}

module.exports = connectToDB;