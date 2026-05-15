const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

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

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;