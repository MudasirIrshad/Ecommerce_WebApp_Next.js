import mongoose from "mongoose";

let alreadyDone = false;
export default async function dbConnection() {
  let DB_URL =
    "mongodb+srv://mudasirirshad47:mudasir123456789@cluster0.jzcnrjw.mongodb.net/Course_Selling_App";
  if (alreadyDone) {
    return;
  }
  await mongoose.connect(DB_URL);
  alreadyDone = true;
  console.log("database connected");
}
