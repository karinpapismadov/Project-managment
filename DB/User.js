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



var requests=new mongoose.Schema({
    Date: Date.now(),
    Id:Number,
    State: {
       type:String,
        possibleValues:["handleded","not handleded"],
    },
    nameReq: String,
    subject: String,
    messages:
        {
            nameMsg:String,
            Msg: String
        }
});

var Requests = mongoose.model("Requests", requests);
module.exports = Requests;

