
var mongoose= require('mongoose');

var requests=new mongoose.Schema({
    Date: Date,
    nameAdr: String,
    NameSender: String,
    State: {
        type:String,
        possibleValues:["handled","not handled"],
        default :"Not Handled"
    },
    subject: String,
    message: Object,



});

var Requests = mongoose.model("Requests", requests);
module.exports = Requests;


