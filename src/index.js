const express=require('express')
const port  =process.env.PORT || 4000
const connectDB=require('../DB/connection.js');
const User = require('../DB/User');
const app  =express()
const bodyParser=require('body-parser');
const emailVali= require('deep-email-validator');
const alert= require('alert');
const session = require('express-session');
var sess;

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

connectDB();
app.use(bodyParser.urlencoded({extended:true}));
//app.use('/api/userModel', require('../Api/User'));

app.use(express.static(__dirname));
app.use(express.static("public"));

var path=require('path');

app.get('/',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/HomePage.html")
})

app.get('/NavigationBarSimpleUser',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/NavigationBarSimpleUser.html")
})

app.get('/NavigationBarDoctor',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/NavigationBarDoctor.html")
})

app.get('/NavigationBarAdmin',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/NavigationBarAdmin.html")
})

app.get('/ProfilePageDoctorAdmin',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/ProfilePageAdmin.html")
})

app.get('/LoginPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/LoginPage.html")
})

app.get('/RegisterPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/RegisterPage.html")
})

// eslint-disable-next-line no-unused-vars
async function isEmailValid(email){
    return emailVali.validate(email);
}

app.get('/getData',(req ,res)=>{
        res.send(sess.firstName);
})


app.post('/RegisterPage',async (req,res)=> {
    User.findOne({Email: req.body.email}, function (err, user) {
        if (err) {
            alert("error");
        }
        if (user) {
            alert('email has already registered');
        } else {
            User.findOne({userName: req.body.userName}, function (err, user) {
                if (err) {
                    alert("error");
                    res.redirect('/RegisterPage');
                }
                if (user) {
                    alert('username taken');
                } else if (req.body.selectType == "null")
                    alert("you must choose a type!!!");
                else if (req.body.psw != req.body.pswRepeat)
                    alert("passwords not matching");
                else if (req.body.psw == '' || req.body.pswRepeat == '')
                    alert("a password is empty");
                else if (!isEmailValid(req.body.email))
                    alert("your email is invalid!");
                else if(req.body.selectType=="admin"&& req.body.code!="1234teamA")
                    alert("code isn't right!!");
                else {
                    var registerUser = new User({
                        selectType: req.body.selectType,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName,
                        Email: req.body.email,
                        Password: req.body.psw,
                        Gender: req.body.Gender
                    });
                    registerUser.save();
                    alert("you are registered");
                    res.redirect("/LoginPage");
                }
            });
        }

    })
});
``

app.post('/LoginPage',async (req,res)=> {
    // eslint-disable-next-line no-unused-vars
    User.findOne({Password: req.body.password, userName: req.body.username}, function (err, user) {
        if (err) {
            alert("error");
        }
        if (user) {
            sess = req.session;
            sess.userName = req.body.username;
            sess.firstName = user.firstName;
            sess.email=user.email;
            if (user.selectType == "admin")
                res.redirect("/NavigationBarAdmin");
            else if (user.selectType == 'doctor')
                res.redirect("/NavigationBarDoctor");
            else if (user.selectType == 'simple user')
                res.redirect("/NavigationBarSimpleUser");
        }
        else{
            alert("password or username is invalid");
            res.redirect("/LoginPage");

        }
    });
});



app.listen(port,()=>{
    console.log('server is up and running at: http://127.0.0.1:'+port)
})
