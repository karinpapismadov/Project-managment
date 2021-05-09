const mongoose= require('mongoose');

const register=new mongoose.Schema({
    selectType:{
        type:String,
        possibleValues:["admin", "doctor","simple user"]},
    firstName:String,
    lastName:String,
    userName:String,
    Email:String,
    Password:String,
    Gender:{
        type:String,
        possibleValues:["Male", "Female"]}

});

const User = mongoose.model("Register&Login", register);
module.exports = User;
