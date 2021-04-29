const express=require('express')
const port  =process.env.PORT || 4000
const connectDB=require('./DB/connection.js');

const app  =express()

connectDB();

app.use('/api/userModel', require('./Api/User'));

app.use(express.static(__dirname));
app.use(express.static("public"));

var path=require('path');

app.get('/',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/src/HomePage.html")
})

app.get('/LoginPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/src/LoginPage.html")
})

app.get('/RegisterPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/src/RegisterPage.html")
   
})

app.listen(port,()=>{
    console.log('server is up and running at: http://127.0.0.1:'+port)
})

