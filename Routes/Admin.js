const express = require("express");
const { AuthenticateToken } = require("../MiddleWare/TokenMiddleware");
const AdminController = require("../Controller/AdminController");

const AdminRouter = express.Router();
//==========>multer uses to upload diffrent form of file=================================>
const multer = require("multer");
const SkillController = require("../Controller/SkillController");
const ExperienceController = require("../Controller/ExperienceController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/admin-backend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
//==========>till this=================================>
AdminRouter.post(
  "/add-project",
  AuthenticateToken,
  upload.single("myFile"),
  AdminController().addProject
);

AdminRouter.get(
  "/getAll-project",
  AuthenticateToken,
  AdminController().getAllProject
);

AdminRouter.get(
  "/get-project",
  AuthenticateToken,
  AdminController().getUserProject
);

AdminRouter.patch(
  "/update-project",
  AuthenticateToken,
  AdminController().updateProject
);

AdminRouter.delete(
  "/delete-project",
  AuthenticateToken,
  AdminController().deleteProject
);
//=============Skillcrud=================================>
AdminRouter.post("/add-skill", AuthenticateToken, SkillController().AddSkill);
AdminRouter.get(
  "/getAll-skill",
  AuthenticateToken,
  SkillController().getAllSkill
);
AdminRouter.get("/get-skill", AuthenticateToken, SkillController().getASkill);
AdminRouter.patch(
  "/update-skill",
  AuthenticateToken,
  SkillController().updateSkill
);
AdminRouter.delete(
  "/delete-skill",
  AuthenticateToken,
  SkillController().deleteSkill
);

// <==================Experience crud======================>

AdminRouter.post(
  "/add-exp",
  AuthenticateToken,
  ExperienceController().addExperience
);
AdminRouter.patch(
  "/update-exp",
  AuthenticateToken,
  ExperienceController().updateExperience
);
AdminRouter.get(
  "/getAll-exp",
  AuthenticateToken,
  ExperienceController().getAllExperience
);

AdminRouter.get(
  "/getA-exp",
  AuthenticateToken,
  ExperienceController().getAExperience
);
AdminRouter.delete(
  "/delete-exp",
  AuthenticateToken,
  ExperienceController().deleteExperience
);

module.exports = AdminRouter;
