const express = require("express");

const {
  createProjectController,
  getProjectsController,
  updateProjectController,
  deleteProjectController,
} = require("../controllers/project.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/*
POST    /api/projects
GET     /api/projects
PUT     /api/projects/:id
DELETE  /api/projects/:id
*/

// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  createProjectController
);

// GET ALL PROJECTS
router.get(
  "/",
  getProjectsController
);

// UPDATE PROJECT
router.put(
  "/:id",
  authMiddleware,
  updateProjectController
);

// DELETE PROJECT
router.delete(
  "/:id",
  authMiddleware,
  deleteProjectController
);

module.exports = router;