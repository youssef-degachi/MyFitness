import mongoose from "mongoose";

export const connectDB= async() => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("connected with database")
  } catch(err){
    console.log("you have err "+err)
  }
}
