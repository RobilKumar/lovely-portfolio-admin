const homeSchema = require("../Schema/HomeSchema");

const homeDataUpdate = ({ dataToHome, adminId }) => {
  return new Promise(async (resolve, reject) => {
    let homeData = "";
    try {
      const filter = { userId: adminId };
      // console.log(typeof(filter));
      // console.log(filter);
      const update = { Description: dataToHome };
      // console.log(update)

      try {
        homeData = await homeSchema.findOneAndUpdate(filter, update);
        console.log("inside findone and update function", homeData);
        if (homeData == null) {
          // `doc` is the document _before_ `update` was applied

          const homeObj = new homeSchema({
            Description: dataToHome,
            userId: adminId,
          });

          homeData = await homeObj.save();
        }
      } catch (error) {
        return res.send({
          status: 500,
          message: "Database error",
        });
      }

      resolve(homeData);
    } catch (error) {
      reject(error);
    }
  });
};

const aboutDataUpdate = (userId, AboutData) => {
  return new Promise(async (resolve, reject) => {
    try {
     // console.log(typeof AboutData);

      //var objectId = mongoose.Types.ObjectId(userId);
      // console.log(objectId);
      //  console.log(update)`
      const filter = { userId: userId };
//console.log(typeof(filter));
      // const update = { AboutData: AboutData.AboutData };

      //console.log("inside findone and update function",AboutData);
      
      //  let data= await homeSchema.findById({userId:filter});
      //console.log(update, userId);

      const aboutDataReturn = await homeSchema.findOneAndUpdate(
      filter,
        { $set: { AboutData: AboutData.AboutData } },
        { new: true }
      );
      console.log(aboutDataReturn);
      resolve(aboutDataReturn);
    } catch (error) {
      reject(error);
    }
  });
};

const takeData = ({ adminId }) => {
  return new Promise(async (resolve, reject) => {
     console.log(adminId);
     console.log(typeof(adminId))
    //console.log(userID);
    try {
      const userData = await homeSchema.find({
        userId: { $in: adminId },
      });
      console.log("this is the take data ", userData);
      resolve(userData[0]);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { homeDataUpdate, takeData, aboutDataUpdate };
