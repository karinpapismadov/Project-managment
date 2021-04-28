const mongoose= require('mongoose');

const register=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    Email:String,
    Password:String,
    Gender:{
        type:String,
        possibleValues:["Male", "Female"]}

});

//module.exports= User = mongoose.model('user',user);
const User = mongoose.model("Register", register);
module.exports = User;

const data={
    firstName:'erelle',
    lastName:'boubli',
    userName:'String',
    Email:'String',
    Password:'String',
    Gender:'Female'
};

const newUser= new User(data);

newUser.save((error)=> {
    if (error) {
        console.log("bad");
    } else
        console.log("data saved");
});
