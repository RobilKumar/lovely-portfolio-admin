const ExperienceSchema = require("../Schema/ExperienceSchema");
const ExperienceService = require("../Services/ExperienceService");

module.exports = () => {
  const addExperience = async (req, res) => {
    const expData = req.body;
    const expDb = await ExperienceService().addExperience(expData);
    if (!expDb)
      return res.status(500).json({ message: "internal server error" });
    return res.status(201).json({ Data: expDb._id });
  };

  const updateExperience = async (req, res) => {
    const updateData = req.body;
    const updateDb = await ExperienceService().updateExperience(updateData);
    if (!updateDb)
      return res
        .status(500)
        .json({ message: "internal server error", updateDb });
    return res.status(201).json(updateDb);
  };

  const getAllExperience = async (req, res) => {
    const allExpDb = await ExperienceService().getAllExperience();
    if (!allExpDb)
      return res
        .status(500)
        .json({ message: "internal server error", allExpDb });
    return res.status(200).json({ allExpDb });
  };

  const getAExperience = async (req, res) => {
    const id= req.query.id;
    const expDb = await ExperienceService().getAExperience(id);
    if (!expDb)
      return res
        .status(500)
        .json({ message: "internal server error", allExpDb });

    return res.status(200).json({ expDb });
  };

  const deleteExperience = async (req, res) => {
    const id = req.body;
    const deleteDb = await ExperienceService().deleteExperience(id);
    if (deleteDb == null)
      return res.status(400).json({ message: "Id didn't found" });

    return res.status(201).json({ message: "Deleted Successfully", deleteDb });
  };

  return {
    addExperience,
    updateExperience,
    getAllExperience,
    deleteExperience,
    getAExperience
  };
};
