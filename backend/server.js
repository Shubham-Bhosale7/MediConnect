import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
// localhost:4000/api/admin/add-doctor -
// when we execute this api the addDoctor controller function will be executed

app.get("/", (req, res) => {
  res.send("API WORKING Great hello is");
});

app.listen(port, () => console.log("Server Started", port));
