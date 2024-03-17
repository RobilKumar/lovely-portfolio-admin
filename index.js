const express= require("express");
require('dotenv').config();
const clc= require("cli-color")




// file imports
const PORT= process.env.PORT;
require("./db");
const Authrouter= require('./Controller/AuthController')


// constant
const app= express();





// middleware
app.use(express.json()); // to read json 



//authrouter
// here those req come with auth
// will be redirected to Authrouter controller
app.use('/auth', Authrouter);

app.listen(PORT, ()=>{
    console.log(clc.yellowBright.underline(`Blogging server is running PORT:${PORT}`));
})