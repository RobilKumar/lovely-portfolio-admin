// express is require here to have router
const express = require("express");
const { validateRegisterData } = require("../Utils/AuthUtils");
const { emailExist, register } = require("../Model/UserModel");
const UserSchema = require("../Schema/UserSchema");
const AuthRouter = express.Router();

// imports

AuthRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
 
  // validate the data
  try {
    await validateRegisterData({ email, password });
    

  } catch (error) {
    return res.send({
      status: 400,
      message: "Data Invalid",
      error: error,
    });
  }

  try {
  
     await emailExist({ email });
     console.log("inside in Controller");

    // creating object
    const userDb=  await register({email,password});
   
    return res.send({
        status:201,
        message:"user register successfully",
        data:userDb
    })
  } catch (error) {
    return res.send({
        status:500,
        message:"Database error",
        error:error
    })
  }
});


module.exports=AuthRouter