const nodemailer=require("nodemailer");
const {google }=require("googleapis");
const mailOption =require("./mailOption");

const CLIENT_ID ="252377071952-9maif9i56gi25kgp6pkjajm4f370pbmi.apps.googleusercontent.com"
const CLIENT_SECRET ="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"
const REDIRECT_URI="https://developers.google.com/oauthplayground";
const REFRESH_TOKEN="1//04Jp_JLsX0DfVCgYIARAAGAQSNwF-L9IrdMjv6-o6Bx4fzEY1KcBXI5NkTJ8RpI9hD8PeJhiGfc9-8TM0raQhacvEep5cmptyp5I"

const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN)
 oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const sendMail=async (req,res)=>{
    try{

        const accessToken= await oAuth2Client.getAccessToken()

    const transport= nodemailer.createTransport({
   service:"gmail",
   auth:{
    type:"OAuth2",
    user:"rakeshkumar85024@gmail.com",
    clientId:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    refreshToken:REFRESH_TOKEN,
    accesstoken:accessToken

   }
    })

    const mail=req.body
    const {from,to,subject,text} =mail
    if(!from) return res.status(400).send({status:false,message:"your email", like:"Rakesh Kumar <rakeshkumar85024@gmail.com>" })
    if(!to) return  res.status(400).send({status:false,message:"send email", like:"Rakesh Kumar <rakeshkumar85024@gmail.com>" })
    if(!subject) return res.status(400).send({status:false,message:"subject " })
    if(!text) return res.status(400).send({status:false,message:"text" })
    const saveMail=await mailOption.create(mail)
    const result=await transport.sendMail(mail)
    console.log(saveMail)
    return res.status(201).send({status:true,message:"sent email", saveMail})
    

    }catch(error){
        console.log(error)
    }
 }
module.exports=sendMail

//  sendMail().then(result=>{console.log("Email sent ...",result)})
//  .catch(err=>console.log(err.message))