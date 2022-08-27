const express= require("express");
const connection = require("./db");
const cors = require("cors");
const Shortrouter = require("./routes/url.route");

const app= express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Welcome to Server")
 })


//redirect route
app.use('/', require('./routes/redirects.route.js'))

//shortrouter route
app.use('/', Shortrouter)


 const PORT =process.env.PORT||8080

 app.listen(PORT, async () => {
    try {
      await connection;
      console.log("connected to db")
    } catch (e) {
      console.log(e);
    }
  });