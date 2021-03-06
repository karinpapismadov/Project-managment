const express=require('express')
const port  =process.env.PORT || 4000
const connectDB=require('../DB/connection.js');
const User = require('../DB/User');
const app  =express()
// eslint-disable-next-line no-unused-vars
const Requests= require('../DB/requestsDB');
const bodyParser=require('body-parser');
const emailVali= require('deep-email-validator');
const alert= require('alert');
const session = require('express-session');
const nodemailer= require('nodemailer');
var sess;
const msg= require('../DB/chatMsgDB');
var word;
module.exports = sess;

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

connectDB();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.text());

var path=require('path');

app.get('/',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/HomePage.html")
})

app.get('/SimpleUser/NavigationBarSimpleUser',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/SimpleUser/NavigationBarSimpleUser.html")
})

app.get('/Doctor/NavigationBarDoctor',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/Doctor/NavigationBarDoctor.html")
})

app.get('/Admin/NavigationBarAdmin',(req ,res)=>{
    try {
        res.sendFile(path.join(__dirname) + "/Admin/NavigationBarAdmin.html")
    }
    catch (e){
        res.send("error");
    }
})

app.get('/ProfilePageAdmin',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/Admin/ProfilePageAdmin.html")
})

app.get('/ProfilePageDoctor',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/Doctor/ProfilePageDoctor.html")
})

app.get('/ProfilePageUser',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/SimpleUser/ProfilePageUser.html")
})

app.get('/LoginPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/LoginPage.html")
})

app.get('/RegisterPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/RegisterPage.html")
})

async function isEmailValid(email){
    return emailVali.validate(email);
}

app.get('/getUser',(req ,res)=>{
    var arr=sess.firstName+','+ sess.userName+','+sess.firstName+' ' +sess.lastName+',' +sess.email;
    res.send(arr);
})

app.get('/getDocAd',(req ,res)=>{
    var arr=sess.firstName+','+sess.firstName+' ' +sess.lastName+','+sess.Clinic+','+sess.email+','+sess.Profession+','+sess.Rating;
    res.send(arr);
})

app.get('/MsgSystemGui', (req,res)=> {
    Requests.find({NameSender: sess.userName}, function (err, user) {
        if(user) {
            res.send(user.length.toString());
        }
    });


});

app.get('/', function(req,res){

    Requests.find({}, (err, user) => {
        if (err) {
            return res.render.status(500).send('<h1>ERROR</h1>');
        } else{
            res.render('/MsgSystemUser',{user, Requests, req});
        }
    });
});

// eslint-disable-next-line no-unused-vars
app.post('/changePassword',(req, res) => {

    var password;
    if (req.body.newps == req.body.renewps)
        password = req.body.newps;
    else
        alert("The passwords doesn't Match !");
    User.findOne({userName: sess.userName}, function (err, user) {
        if (user) {
            user.Password = password;
            user.save();
            alert("saved!")
        } else
            alert("don't saved");
    });
    res.redirect("/ChangePassword.html");
})

app.post('/changeEmail',(req, res) => {

    var email;
    if (req.body.newmail == req.body.renewmail)
        email = req.body.newmail;
    else
        alert("The email doesn't Match !");
    User.findOne({userName: sess.userName}, function (err, user) {
        if (user) {
            user.Email = email;
            user.save();
            alert("saved!")
        } else
            alert("don't saved");
    });
    res.redirect("/ChangeEmail.html");
})

app.get('/MsgSystemGui2', (req,res)=> {
    var string="";
    var string2;
    Requests.find({NameSender: sess.userName}, function (err, user) {
        if(user) {
            for(var i=0; i<user.length; i++) {
                string2=user[i].NameSender+"  " +user[i].nameAdr+"    "+ user[i].State+"    "+ user[i].Date+"    "+ user[i].subject+"      "+"-";
                string+=string2;
                string2='';
            }
            res.send(string);
        }
    });


});




// eslint-disable-next-line no-unused-vars
app.post('/SearchPost', async (req,res)=> {
    word=req.body.search;

});

app.get('/SearchGet', (req,res)=> {
    var string="";
    var string2;
    User.find({$or:[{userName: word},{firstName:word}]}, function (err, user) {
        if(user) {
            alert(user);
            for(var i=0; i<user.length; i++) {
                string2= user[i].userName+" "+user[i].firstName+" "+user[i].lastName+" "+user[i].Clinic+"-";
                string+=string2;
                string2='';
            }
        }
    });
    alert(string);
    res.send(string);

});




// eslint-disable-next-line no-unused-vars
app.post('/MsgSystem', async(req,res)=>{
    var msgss= new msg({
        Text: req.body.txtMsg,
        NameSender: sess.userName
    });
    msgss.save();
    var requests = new Requests({
        Date: Date.now(),
        nameAdr: req.body.uname,
        NameSender: sess.userName,
        subject: req.body.subj,
        message: [msgss],
        Image: sess.Image

    });
    requests.save();
    alert("save to requests");


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
                else if(req.body.selectType=="doctor" &&(req.body.Clinic==null || req.body.Profession==null))
                    alert("clinic or profession is empty");
                else if(req.body.selectType=="doctor" && req.body.code!="doctorApproved" ){
                    alert("your information was sent to the Admin, please wait for his approval");
                    sendMail("reina.boubli1998@gmail.com", req.body.firstName,req.body.lastName,  req.body.email);
                }
                else {
                    var registerUser = new User({
                        selectType: req.body.selectType,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName,
                        Email: req.body.email,
                        Password: req.body.psw,
                        Gender: req.body.Gender,
                        Profession: req.body.Profession,
                        Clinic: req.body.Clinic,
                        Rating:req.body.Rating,
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
            sess.userName = user.userName;
            sess.firstName = user.firstName;
            sess.email=user.Email;
            sess.lastName=user.lastName;
            sess.Profession=user.Profession;
            sess.Clinic=user.Clinic;
            sess.Rating=user.Rating;
            sess.Image=user.Image;
            if (user.selectType == "admin")
                res.redirect("/Admin/NavigationBarAdmin");
            else if (user.selectType == 'doctor')
                res.redirect("/Doctor/NavigationBarDoctor");
            else if (user.selectType == 'simple user')
                res.redirect("/SimpleUser/NavigationBarSimpleUser");
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

// eslint-disable-next-line no-unused-vars
function sendMail(email,name, last, DocEmail){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'node.js.noreplay@gmail.com',
            pass: '12345@rugh'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'node.js.noreplay@gmail.com',
        to: email,
        subject: 'Doctor '+name+" trying to register",
        text: 'Hi Admin, the Doctor '+name+" "+last+" is trying to register with email: "+ DocEmail
    };

    // eslint-disable-next-line no-unused-vars
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });
}