const blogModel = require("../models/blog.model");

/*
CREATE BLOG
*/
const createBlogController = async (req, res) => {
  try {
    const { title, content, tags, read } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newBlog = await blogModel.create({
      title,
      content,
      tags,
      read,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
GET ALL BLOGS
*/
const getBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
GET SINGLE BLOG
*/
const getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel
      .findById(id)
      .populate("user", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
UPDATE BLOG
*/
const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // OWNER CHECK
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const updatedBlog =
      await blogModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

/*
DELETE BLOG
*/
const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // OWNER CHECK
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    await blogModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Blog deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createBlogController,
  getBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
};