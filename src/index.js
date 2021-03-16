const express=require('express')
const port  =process.env.PORT || 4000
const app   =express()

app.use(express.static(__dirname));
app.use(express.static("public"));

var path=require('path');

app.get('/',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/HomePage.html")
})

app.get('/LoginPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/LoginPage.html")
})

app.get('/RegisterPage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/RegisterPage.html")
})

app.get('/HomePage',(req ,res)=>{
    res.sendFile(path.join(__dirname)+"/HomePage.html")
})

app.listen(port,()=>{
    console.log('server is up and running at: http://127.0.0.1:'+port)
})

