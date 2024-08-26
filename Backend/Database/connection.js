import mongoose from "mongoose";
export const DbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "JOB_Portal",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("error while connnecting database:");
      console.log(err);
    });
};
