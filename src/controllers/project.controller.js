const projectModel = require("../models/project.model");

/*
CREATE PROJECT
*/
const createProjectController = async (req, res) => {
  try {
    const {
      title,
      desc,
      techStack,
      github,
      liveDemo,
    } = req.body;

    if (!title || !desc) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const newProject = await projectModel.create({
      title,
      description: desc,
      techStack,
      githubLink: github,
      liveLink: liveDemo,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
GET ALL PROJECTS
*/
const getProjectsController = async (req, res) => {
  try {

    const projects = await projectModel
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
UPDATE PROJECT
*/
const updateProjectController = async (req, res) => {
  try {

    const { id } = req.params;

    const project =
      await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // OWNER CHECK
    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const updatedProject =
      await projectModel.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          description: req.body.desc,
          techStack: req.body.techStack,
          githubLink: req.body.github,
          liveLink: req.body.liveDemo,
        },
        { new: true }
      );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
DELETE PROJECT
*/
const deleteProjectController = async (req, res) => {
  try {

    const { id } = req.params;

    const project =
      await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // OWNER CHECK
    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    await projectModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createProjectController,
  getProjectsController,
  updateProjectController,
  deleteProjectController,
};