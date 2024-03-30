const ExperienceSchema = require("../Schema/ExperienceSchema");

module.exports = () => {
  const addExperience = (expData) => {
    console.log("addExperience=========>ExperienceService");
    return new Promise(async (resolve, reject) => {
      await ExperienceSchema.create({
        CompanyName: expData.CompanyName,
        Designation: expData.Designation,
        Description: expData.Description,
        startDate: expData.startDate,
        endDate: expData.endDate,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  const updateExperience = (updateData) => {
    console.log("updateExperience=========>ExperienceService");
    const filter = { _id: updateData.id };

    return new Promise(async (resolve, reject) => {
      await ExperienceSchema.findByIdAndUpdate(filter, updateData, {
        new: true,
      })
        .then(resolve)
        .catch(reject);
    });
  };


  const getAllExperience= ()=>{
    console.log("getAllExperience=========>ExperienceService");
    return new Promise(async(resolve,reject)=>{
      await ExperienceSchema.find({}).then(resolve).catch(reject);
    })
  }

  const deleteExperience=(id)=>{
    console.log("deleteExperience=========>ExperienceService");
    let Id= id.id
    return new Promise(async(resolve,reject)=>{
      await ExperienceSchema.findByIdAndDelete({_id:Id}).then(resolve).catch(reject);
    })
  }

  return { addExperience, updateExperience,getAllExperience,deleteExperience};
};
