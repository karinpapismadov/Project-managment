const express=require('express')
const port  =process.env.PORT || 4000
const app   =express()

app.get('/',(req ,res)=>{
    res.send("Welcome To Home Page")
})

app.get('/LoginPage',(req ,res)=>{
    res.send("Login Page")
})
app.listen(port,()=>{
    console.log('server is up and running at: http://127.0.0.1:'+port)
})

