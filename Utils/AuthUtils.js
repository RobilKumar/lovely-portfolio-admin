const nodemailer = require("nodemailer");
const UserSchema = require("../Schema/UserSchema");
require("dotenv").config();

const bcrypt = require("bcrypt");
const { findUserWithEmail } = require("../Model/UserModel");
function isValidEmail(email) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //console.log("inside AuthUtils")
  return emailRegex.test(email);
}

// its a validator for register request and
//using series of variable doesn't matter because its a javascript object
const validateRegisterData = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) reject("Missing Credential");

    if (typeof email !== "string") reject("Invalid datatype of email");
    if (typeof password !== "string") reject("Invalid datatype of password");

    if (!isValidEmail(email)) {
      reject("Email format is wrong");
    }

    console.log("inside AuthUtils");
    resolve();
  });
};

const sendPasswordResetEmail = async (email, token, otp) => {
  console.log("checking otp token", token, otp);

  // create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options

  const mailOptions = {
    from: "robil.cs.coder@gmail.com",
    to: "robil.mech@gmail.com",
    subject: "Password reset",
    html: `Click the link to reset your password: <a href="http://localhost:3002/auth/reset-password?token=${token}">Reset Password</a>
    <br>
    Your OTP for password reset is: <strong>${otp}</strong>`,
  };

  // send mail here
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const resetPassword = ({ password, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const adminDb = await UserSchema.findOne({
      //   resetPasswordToken: resetPasswordToken,
      //   resetPasswordExpires: { $gt: Date.now() },
      //   otp: otp,
      // });

      const adminDb = await findUserWithEmail({ email });

      // const adminDb= await UserSchema.findOne({
      //   email:{$eq:email}
      // })

      //console.log("th9is is form old admin ", adminDb);
      //   if (!adminDb) {
      //     return res
      //       .status(400)
      //       .json({ message: "Invalid or expired token or OTP" });
      //   }

      // update admin userpassword

      // bcrpt the password again bruh
      // hashed the password
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT) // here in hash(password, hashit 10times)
      );

      adminDb.password = hashedPassword;
      // adminDb.resetPasswordToken = null;
      // adminDb.resetPasswordExpires = null;
     // adminDb.otp = otp;

      await adminDb.save();

      //   res.send({
      //     status: 200,
      //     message: "password reset successfully",
      //   });
      //  console.log("th9is is form new admin ", adminDb);
      resolve(adminDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  validateRegisterData,
  isValidEmail,
  sendPasswordResetEmail,
  resetPassword,
};
