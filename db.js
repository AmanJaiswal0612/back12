const mongoose= require("mongoose")

const connection=mongoose.connect("mongodb+srv://amanjaiswal:aman0612@cluster0.fpuxu.mongodb.net/T12-app");

module.exports=connection;