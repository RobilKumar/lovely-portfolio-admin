const express = require("express");
const { AuthenticateToken } = require("../MiddleWare/TokenMiddleware");
const AdminController = require("../Controller/AdminController");

const AdminRouter = express.Router();
//==========>multer uses to upload diffrent form of file=================================>
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/admin-backend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({  storage });
//==========>till this=================================>
AdminRouter.post(
  "/add-project",
 AuthenticateToken,
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


module.exports = AdminRouter;
