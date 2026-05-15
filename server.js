require("dotenv").config()
let app = require("./src/app")
const connectDB = require("./src/config/db");

connectDB()

let port = process.env.PORT || 4000

if (require.main === module) {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

module.exports = app;
