// express is require here to have router
const express = require("express");



const { ObjectId } = require('mongodb');

// for reset-password
const mongoose= require('mongoose')
const {
  validateRegisterData,
  sendPasswordResetEmail,
  resetPassword,
} = require("../Utils/AuthUtils");
const {
  emailExist,
  register,
  findUserWithEmail,
} = require("../Model/UserModel");
const UserSchema = require("../Schema/UserSchema");
const AuthRouter = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticateToken } = require("../MiddleWare/TokenMiddleware");
const { homeDataUpdate, takeData, aboutDataUpdate } = require("../Model/HomeModel");
const { isError } = require("util");

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

    // creating object
    const userDb = await register({ email, password });

    return res.send({
      status: 201,
      message: "user register successfully",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      status: 400,
      message: "Missing credential",
    });
  }

  // find user with email and check password

  try {
    const adminDb = await findUserWithEmail({ email });
    // console.log("inside in Controller");
    const isMatched = await bcrypt.compare(password, adminDb.password);

    if (!isMatched) {
      return res.send({
        status: 400,
        message: "password doesn't matched",
      });
    }

    // here create token base session
    const user = { id: adminDb._id };
    const token = jwt.sign(user, process.env.SECRET_KEY);

    // return response
    return res.send({
      status: 200,
      message: "login success",
      cookies: token,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// forgot password

AuthRouter.post("/forgot-password", async (req, res) => {
  const adminEmail = req.body.email;
  // console.log( typeof(adminEmail));

  try {
    // find admin by email
    const adminDb = await findUserWithEmail({ email: adminEmail });

    // Generate a random token for password reset
    //const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log(resetToken);
    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save this in db
    // adminDb.resetPasswordToken = resetToken;
    // adminDb.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    adminDb.otp = otp;
    await adminDb.save();
    // console.log(adminDb);
    return res.send({
      status: 201,
      message: "OTP has been sent",
      otp: otp,
    });

    // try {
    //   await sendPasswordResetEmail(adminEmail, resetToken, otp);
    //   return res.send({
    //     status: 200,
    //     message: "Password reset email ",
    //   });
    // } catch (error) {
    //   return res.send({
    //     status: 500,
    //     message: "Internal server error",
    //     error: error,
    //   });
    // }
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// otp verify
AuthRouter.post("/otp-verify", async (req, res) => {
  const { email, otp } = req.body;
  // console.log(email, otp);

  try {
    const adminDb = await findUserWithEmail({ email });

    //  console.log("this is from otp-verify", adminDb.otp);

    if (otp !== adminDb.otp) {
      return res.send("otp doesn't matched ");
    }
    res.send({
      status: 201,
      message: "otp verified",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
    });
  }
});

// reset-password
AuthRouter.post("/reset-password", async (req, res) => {
  const { password, email } = req.body;
  // console.log(req.body);
  // console.log(req.body.otp);

  try {
    const adminDb = await resetPassword({
      password,
      email,
    });

    // console.log("this is from authcontroller", adminDb);
    return res.send({
      status: 201,
      message: "password reset successfully",
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

AuthRouter.put("/home", AuthenticateToken, async (req, res) => {
  const dataToHome = req.body.Description;
  const adminId = req.user.id;
  
 
  //  console.log("userid this" ,userId);
  try {
    const homeData = await homeDataUpdate({ dataToHome, adminId });
    return res.send({
      status: 201,
      message: "data successfully saved",
      // data: homeData,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
    });
  }
});

// get home-data

AuthRouter.get("/home", AuthenticateToken, async (req, res) => {
  const adminId = req.user.id;
  // console.log("this is adminid", adminId);

  try {
    const homeData = await takeData({ adminId });

    res.send({
      status: 201,
      data: homeData.Description,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

AuthRouter.patch("/about", AuthenticateToken, async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  const AboutData = req.body;
  //const objectId =  ObjectId(userId);

 


  //var objectId =  mongoose.Types.ObjectId.createFromHexString(userId)
 
 // var objectId = mongoose.mongo.BSONPure.ObjectID.fromHexString(userId)
  //const objectId =  mongoose.Types.ObjectId(userId);

  

  try {
    const aboutDatas = await aboutDataUpdate(userId, AboutData);
    return res.send({
      status: 201,
      message: "data successfully saved",
      // data: homeData,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error:error
    });
  }
});

AuthRouter.get("/about", AuthenticateToken, async (req, res) => {
  const adminId = req.user.id;
  // console.log("this is adminid", adminId);

  try {
    const homeData = await takeData( {adminId} );

    res.send({
      status: 201,
      data: homeData.AboutData,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});



module.exports = AuthRouter;
