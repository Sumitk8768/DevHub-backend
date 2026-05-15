const express = require("express");

const {
  createBlogController,
  getBlogsController,
  deleteBlogController,
  getSingleBlogController,
  updateBlogController,
} = require("../controllers/blog.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/*
POST    /api/blogs
GET     /api/blogs
GET     /api/blogs/:id
PUT     /api/blogs/:id
DELETE  /api/blogs/:id
*/

// Get Single Blog
router.get("/:id", getSingleBlogController);

// Update Blog
router.put("/:id", authMiddleware, updateBlogController);

// Create Blog
router.post("/", authMiddleware, createBlogController);

// Get All Blogs
router.get("/", getBlogsController);

// Delete Blog
router.delete("/:id", authMiddleware, deleteBlogController);

module.exports = router;