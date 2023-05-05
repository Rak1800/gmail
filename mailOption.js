const { default: mongoose } = require("mongoose")

const mailOptions=new mongoose.Schema(
    {
    from: {
        type:String,
        required:true
    },
    to:{
         type:String,
         required:true
    },
    subject:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
},{timestamps:true})

module.exports= mongoose.model("Email", mailOptions)