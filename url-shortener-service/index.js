import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connect.js";
import urlRoutes from "./api/v1/url/index.js"


const app = express();

// adding middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/shorten', urlRoutes);

// console.log(process.env.Frontend_URL)

config({
  path: ".env"
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening to ${PORT} port`);
})

const databaseConnection = async () => {
  try {
    await connectDb(process.env.DATABASE_URL);
    app.get("/api/shorten", (req, res) => {
      res.send("Hi Welcome to shorten service ")
    })
  } catch (error) {
    console.log(error);
  }
}
databaseConnection();