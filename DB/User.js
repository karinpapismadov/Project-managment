var mongoose= require('mongoose');

var register=new mongoose.Schema({
    selectType:{
        type:String,
        possibleValues:["admin", "doctor","simple user"]},
    firstName:String,
    lastName:String,
    userName:String,
    Email:String,
    Password:String,
    Clinic: String,
    Profession:String,
    Rating: {
        type:Number,
        default:0.0},
    Gender:{
        type:String,
        possibleValues:["Male", "Female"]}

});

var User = mongoose.model("Registers&Login", register);
module.exports = User;
