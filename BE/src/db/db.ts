import mongoose, { Schema } from "mongoose"
import { DB_URL } from "../config/dotenv"

mongoose.connect(DB_URL).then((res) => {
    console.log("Connection to Mongodb is Succesfull!");

}).catch((err) => {
    console.log("Error in Connecting Mongodb !");

})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    phoneno: String,
    address: String,
    isAdmin: Boolean
})


const bookingSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    service: String,
    status: {
        type: String,
        enum: [, "ongoing", "completed"],
        default: "ongoing",
    },
    payment: { type: String, enum: ["completed", "pending"], default: "pending" },
    price: String,
    cname: String,
    carno: String, date: String, address: String, email: String, phone: String
})

export const User = mongoose.model("User", userSchema)
export const Booking = mongoose.model("Booking", bookingSchema)