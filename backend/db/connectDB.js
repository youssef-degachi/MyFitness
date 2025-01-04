import mongoose from "mongoose";
// connect with DB exist in mongo cloud
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected with database");
  } catch (err) {
    console.log("you have err " + err);
  }
};

export default connectDB;
