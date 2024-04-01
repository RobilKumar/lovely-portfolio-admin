const SkillSchema = require("../Schema/SkillSchema");

module.exports = () => {
  const createSkill = (data) => {
    const { userId, Skills } = data;
    console.log("skillService===>createSkill");
    console.log(Skills.Skill);
    // const dataFromUser = Skills.skillArray.map((obj) => ({
    //   key: obj.key,
    //   value: obj.value,
    // }));
    // key = dataFromUser[0].key;
    // value = dataFromUser[0].value;
    // console.log("key"+key+"value"+value);
    return new Promise(async (resolve, reject) => {
      const skillDb = await SkillSchema.create({
        Skill: Skills.Skill,
        Value: Skills.Value,
      });
      console.log(skillDb);
      resolve(skillDb);
    });
  };

  const getAllSkill = () => {
    console.log("skillService===>getAllSkill");
    return new Promise(async (resolve, reject) => {
      await SkillSchema.find({}).then(resolve).catch(reject);
    });
  };

  const getASkill=(id)=>{

    console.log("skillService===>getASkill");
    console.log(id);
    return new Promise(async(resolve,reject)=>{
      SkillSchema.findById(id).then(resolve).catch(reject)
    })
  }

  const updateSkill = (data) => {
    console.log("skillService===>updateSkill");
      const filter={_id:data.id}
      // console.log(filter);
      // console.log(data.Skills);
      
    //==============different thing===================>
    // const dataFromUser = Skills.Skills.map((obj) => ({
    //   key: obj.key,
    //   value: obj.value,
    // }));
    // key = dataFromUser[0].key;
    // value = dataFromUser[0].value;

    // const dataTobeupdated = Skills.Skills;
    // console.log(dataTobeupdated,"datatobeupdated");
    // console.log(data, "data is printed")

    return new Promise(async (resolve, reject) => {
      try {
        const updatedSkillDb= await SkillSchema.findByIdAndUpdate(filter, data.Skills,{
          new: true,
        });
        // const updatedSkillDb = await SkillSchema.updateOne(
        //   // { _id: '6606b84d4c19615cdba86bd4'},
        //   { _id: "6606b84d4c19615cdba86bd4" },
        //   { $set: { "Skills.$[elem].value": value } },
        //   { arrayFilters: [{ "elem.key": { $eq: key } }] }
        // ); // Remove 'value2' from the skills array
        console.log(updatedSkillDb);
        resolve(updatedSkillDb);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteSkill = (id) => {
    console.log("skillService===>deleteSkill");

    return new Promise(async (resolve, reject) => {
      try {
        const deleteDb = await SkillSchema.deleteOne({ _id: id });
        console.log(deleteDb);
        resolve(deleteDb);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { createSkill, updateSkill, deleteSkill, getAllSkill,getASkill };
};
