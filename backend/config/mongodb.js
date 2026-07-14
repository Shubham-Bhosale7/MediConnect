import mongoose from "mongoose";

const DB = process.env.MONGODB_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  await mongoose.connect(DB, {
    dbName: "mediconnect", // 👈 This explicitly targets your database safely
  });
};

export default connectDB;
