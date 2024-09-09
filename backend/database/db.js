const mongoose = require('mongoose');
require('dotenv').config();
// const MONGODB_URL = process.env.MONGODB_LINK
const MONGODB_URL="mongodb+srv://prabhash04wije:TmAtTkX3lFMBtrq4@emp.loffw.mongodb.net/?retryWrites=true&w=majority&appName=Emp"
const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log(`MongoDb server connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDb server not connected ${error}`)
    }
}

module.exports = connectDb