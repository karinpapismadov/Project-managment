const mongoose= require('mongoose');

const URI= "mongodb+srv://erelle:pRf_W2_EGaK_J3n@cluster0.oltiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB= async ()=>{
    await mongoose.connect(URI,{ useUnifiedTopology: true ,useNewUrlParser: true });
    console.log('db connected');
}

module.exports=connectDB;
