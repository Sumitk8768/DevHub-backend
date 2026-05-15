const express = require("express");
let authRoutes = require("./routes/auth.routes");
let projectRoutes = require("./routes/project.routes")
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/blog.routes");
const cors = require("cors");



const app = express()
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/blogs", blogRoutes);



module.exports = app;

