import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const frontendDist = path.join(currentDirectory, "../frontend/dist");
const adminDist = path.join(currentDirectory, "../admin/dist");

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
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Serve both React applications from the same host after building them.
app.use("/admin", express.static(adminDist));
app.use(express.static(frontendDist));

app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminDist, "index.html"), (error) => {
    if (error) res.status(404).send("Admin app is not built yet");
  });
});

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"), (error) => {
    if (error) res.send("API WORKING Great hello is");
  });
});

app.listen(port, () => console.log("Server Started", port));

export default app;