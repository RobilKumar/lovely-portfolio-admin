// express is require here to have router
const express = require("express");
const { validateRegisterData } = require("../Utils/AuthUtils");
const {
  emailExist,
  register,
  findUserWithEmail,
} = require("../Model/UserModel");
const UserSchema = require("../Schema/UserSchema");
const AuthRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticateToken } = require("../MiddleWare/TokenMiddleware");
const { homeDataUpdate } = require("../Model/HomeModel");

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
    const userDb = await findUserWithEmail({ email });
    console.log("inside in Controller");
    const isMatched = await bcrypt.compare(password, userDb.password);

    if (!isMatched) {
      return res.send({
        status: 400,
        message: "password doesn't matched",
      });
    }

    // here create token base session
    const user = { id: userDb._id };
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

AuthRouter.post("/home", AuthenticateToken, async (req, res) => {
  const dataToHome = req.body.Description;
  console.log(dataToHome);
  try {
    const homeDb = await homeDataUpdate({ dataToHome });
    return res.send({
      status: 201,
      message: "data successfully saved",
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Database error",
    });
  }
});

module.exports = AuthRouter;
