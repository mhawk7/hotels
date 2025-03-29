//import mongoose
const mongoose = require('mongoose');

//define url for mongodb
const mongourl = 'mongodb://localhost:27017/hotels';

//set up mongodb connection
mongoose.connect(mongourl,{
    // useUrlParser:true,
    // useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongodb server');
})
db.on('error',(err)=>{
    console.log('Mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log('Mongodb disconnected');
})

//export db connection object
module.exports = db;