let mongoose = require("mongoose")
let dns = require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let connectionPromise = null;

let connectDB = async ()=>{
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        if (!connectionPromise) {
            connectionPromise = mongoose.connect(process.env.MONGODB_URL)
        }

        await connectionPromise
        console.log("mongodb connected successfully")
    } catch (error) {
       connectionPromise = null;
       console.log("error in connecting dataBase", error)
       throw error;
    }
}

module.exports = connectDB
