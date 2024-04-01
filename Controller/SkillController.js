const SkillSchema = require("../Schema/SkillSchema");
const { updateMany } = require("../Schema/UserSchema");
const SkillService = require("../Services/SkillService");

module.exports = () => {
  const AddSkill = async (req, res) => {
    let userId = req.user.id;
    // console.log(req.body , "this is from AddSkill controller");
    const Skills = req.body;

    //console.log(data[0].value, "this is from AddSkill controller 2");
    // const { skillArray } = req.body;
    const data = { userId, Skills };

    const skillDb = await SkillService().createSkill(data);
    // console.log(skillDb, "this is from skillService")
    if (!skillDb) res.status(500).json({ message: "skill not added" });
    res.send({
      status: 201,
      Data: skillDb,
    });
  };

  const getAllSkill = async (req, res) => {
    const skillDb = await SkillService().getAllSkill();
    if (!skillDb)
      return res.status(500).json({ message: "Internal server error" });
    return res.status(200).json({ Data: skillDb });
  };
  const getASkill = async (req, res) => {
    console.log(req.query.id);
    const id = req.query.id;
   console.log(id);
   
    const skillDb = await SkillService().getASkill(id);
    if (!skillDb) return res.status(500).json({ message: "Id not found" });

    return res.status(200).json({ message: "Successfully get", skillDb });
  };

  const updateSkill = async (req, res) => {
    //let userId = req.user.id;
    //console.log(req.body);
    const id = req.body._id;
    const Skills = req.body;

    const data = { id, Skills };

    const updatedSkillDb = SkillService().updateSkill(data);
    if (!updatedSkillDb) res.status(500).json({ message: "Database error" });

    res.send({
      status: 201,
      message: "updated successfully",
      Data: updatedSkillDb,
    });
  };

  const deleteSkill = async (req, res) => {
    const id = req.body;

    const deleteSkill = await SkillService().deleteSkill(id);
    // console.log(deleteSkill,"this is from skill controller deletedSkill ")
    if (deleteSkill.deletedCount > 0)
      res.status(201).json({
        message: "Deleted successfully",
      });
    else {
      res.status(500).json({ message: "Database error" });
    }
  };

  return { AddSkill, updateSkill, deleteSkill, getAllSkill,getASkill };
};
