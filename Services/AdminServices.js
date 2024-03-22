const ProjectSchema = require("../Schema/ProjectSchema");

module.exports = () => {
  const createProject = (req, res) => {
    const { projectname, link, userId, technology } = req;
    console.log(req);

    new Promise(async (resolve, reject) => {
      try {
        const projectDb = await ProjectSchema.create({
          projectname: projectname,
          link: link,
          technology: technology,
          userId: userId,
        });

        resolve(projectDb);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getAllProject = (req, res) => {
    return new Promise(async (resolve, reject) => {
      try {
        const projectDb = await ProjectSchema.find({});

        resolve(projectDb);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUserProject = (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const projectDb = await ProjectSchema.find({
          userId: userId,
        });

        resolve(projectDb);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateProject = (projectId, data) => {
    return new Promise(async (resolve, reject) => {
      const project = await ProjectSchema.findByIdAndUpdate(
        { _id: projectId },
        data
      );

      project.then(resolve).catch(reject);
    });
  };

  const deleteProject = (projectId) => {
      return new Promise(async(resolve,reject)=>{
     await ProjectSchema.deleteOne({_id:projectId}).then(resolve).catch(reject);
        //console.log(deleteDb)
       // deleteDb.then(resolve).catch(reject)
      })
  };

  return { createProject, getAllProject, getUserProject, updateProject,deleteProject };
};
