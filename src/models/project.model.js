const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    techStack: [
      {
        type: String,
        trim: true,
      },
    ],

    githubLink: {
      type: String,
      trim: true,
    },

    liveLink: {
      type: String,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("projects", projectSchema);

module.exports = projectModel;