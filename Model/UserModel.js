const UserSchema = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");

const emailExist = ({ email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   const UserExist = await UserSchema.findOne({
      //     email: email,
      //   });

      const UserExist = await UserSchema.findOne({
        email: { $eq: email },
      });

      if (UserExist && UserExist.email == email) reject("Email Already exists");
      // console.log(" inside userModel");
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const register = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    // hashed the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT) // here in hash(password, hashit 10times)
    );

    const userObj = new UserSchema({
      email: email,
      password: hashedPassword,
    });
    try {
      const userDb = userObj.save();
      resolve(userDb);
    } catch (error) {
      reject(error);
    }
  });
};

// to find user with email id

const findUserWithEmail = ( {email} ) => {
  //console.log("find User with email", email);
  return new Promise(async (resolve, reject) => {
    try {
      const adminDb = await UserSchema.findOne({
        email: { $eq: email },
      });
      
   // console.log("this is from adminModel", adminDb)
      if (adminDb == null) reject("go and first Register with this email");
      // console.log(userDb);

    
      resolve(adminDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { emailExist, register, findUserWithEmail };
