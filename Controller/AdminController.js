const { left } = require("cli-color/move");
const ProjectSchema = require("../Schema/ProjectSchema");
const AdminServices = require("../Services/AdminServices");

module.exports = () => {
  const addProject = async (req, res) => {
    let userId = req.user.id;
    let { projectname, title, link, technology } = req.body;

    let data = { userId, projectname, title, link, technology };
    // console.log(data);
    let projectDb = await AdminServices().createProject(data);
    res.send({
      message: "sab thik hai kaam chalu rakho",
      data: projectDb,
    });
  };

  const getAllProject = async (req, res) => {
    // console.log(req.user.id)

    try {
      let allProjectDb = await AdminServices().getAllProject();
      if (!allProjectDb) res.status(404).json({ message: "project not found" });
      res.status(200).json(allProjectDb);
    } catch (error) {
      return res.send({
        status: 500,
        message: "Database error",
        error: error,
      });
    }
  };
  // get userspecific project

  const getUserProject = async (req, res) => {
    // console.log(req.user.id)
    const userId = req.query.id;
    // console.log(typeof userId);
    try {
      let ProjectDb = await AdminServices().getUserProject(userId);
      console.log("all good till here");
      if (!ProjectDb) return res.status(404).json({ message: "Id not found" });
      res.status(200).json(ProjectDb);
    } catch (error) {
      return res.send({
        status: 500,
        message: "Id not found",
      });
    }
  };

  const updateProject = async (req, res) => {
    let projectId = req.body._id;
    let toUpdatedData = req.body;
    try {
      const updateDb = await AdminServices().updateProject(
        projectId,
        toUpdatedData
      );
      res.status(201).json(updateDb);
    } catch (error) {
      res.send({
        status: 500,
        message: "Database error",
        error: error,
      });
    }
  };

  const deleteProject = async (req, res) => {
    const projectId = req.body._id;
    try {
      const deleteDb = await AdminServices().deleteProject(projectId);
      console.log(deleteDb);
      if (deleteDb.deletedCount == 0)
        return res.json({ message: "No project found" });
      res.status(201).json(deleteDb);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  return {
    addProject,
    getAllProject,
    getUserProject,
    updateProject,
    deleteProject,
  };
};
