
var mongoose= require('mongoose');


var chatMsg=new mongoose.Schema({
    Text: String,
    NameSender: String
});


var msg = mongoose.model("Messages", chatMsg);
module.exports = msg;