const express=require("express");
const mongoose=require("mongoose");
const route = require("./route");

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


  mongoose.connect("mongodb+srv://Rak18000:Rakesh123@cluster0.xntrj.mongodb.net/EmailId",{
    useNewUrlParser:true
 }).then(()=>console.log("mongoDb is connected"))
 .catch((err)=>console.log(err))

 app.use('/',route)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("express is running on "+ (process.env.PORT || 3000))
})