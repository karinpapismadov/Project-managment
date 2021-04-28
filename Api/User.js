const express= require('express');

// eslint-disable-next-line no-unused-vars
const mongoose= require('mongoose');

const User= require('../DB/User');

const route= express.Router();

route.post('/',async (req,res)=> {
    const {firstName, lastName}= req.body;
    let user={};
    user.firstName=firstName;
    user.lastName=lastName;
    let userModel= new User(user);
    await userModel.save();
    res.json(userModel);
})

// eslint-disable-next-line no-unused-vars
route.post('/RegisterPage', function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var registers = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        Email: req.body.email,
        Password: req.body.psw,
        Gender: req.body.Gender
    })
})


    module.exports = route;
