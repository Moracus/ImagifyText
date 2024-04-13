import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import postRouter from "./routes/Posts.js";
import generateImageRouter from "./routes/GenerateImage.js";
dotenv.config();
const app = express();
app.use(cors({
  origin:["https://imagifytext.netlify.app","http://localhost:*"]
    }));
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status.json({
    success: false,
    status,
    message,
  });
});

app.use("/api/post", postRouter);
app.use("/api/generateimage",generateImageRouter);

// default get
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

//function to connect mongo db
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Monodb connected"))
    .catch((err) => {
      console.error("faled to connect");
      console.error(err);
    });
};
//function to start the server
const starServer = () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("server has been started"));
  } catch (error) {
    console.log(error);
  }
};
starServer();
