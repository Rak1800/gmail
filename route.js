const sendMail = require("./sendMail")

const router=require("express").Router()

router.post("/sent",sendMail)

module.exports=router