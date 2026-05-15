const { default: mongoose } = require("mongoose");

let userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: [true, "name is required"],
        trim: true,
    },
    email:{
        type:String,
        required: [true, "email is required"],
        trim: true,
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        trim: true,
    }
},
{
    timestamps: true,
}

)

let userModel = mongoose.model("users", userSchema)

module.exports = userModel;