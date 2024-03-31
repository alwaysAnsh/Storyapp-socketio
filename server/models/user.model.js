import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
    },
    roomId: {
        type: String,
        // unique: true,
        // required: true,
        default: "room6"
    }
},{timestamps: true})

const User = mongoose.model('User',userSchema)
export default User;