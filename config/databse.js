const mongoose = require("mongoose")
const Databse = async(mongoose)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(" Mongoose connected successfullly");
    }catch(err){
        console.log(err.message)
        console.log(" Mongoose connection failed");
    }
};
module.exports = Databse; 

