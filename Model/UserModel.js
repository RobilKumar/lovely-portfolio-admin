const UserSchema = require("../Schema/UserSchema");

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
      console.log(" inside userModel");
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const register = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const userObj = new UserSchema({
      email: email,
      password: password,
    });
    try {
      const userDb = userObj.save();
      resolve(userDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { emailExist, register };
