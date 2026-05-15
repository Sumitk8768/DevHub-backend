let mongoose = require("mongoose")
let dns = require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected successfully")
    } catch (error) {
       console.log("error in connecting dataBase", error)
    }
}

module.exports = connectDB