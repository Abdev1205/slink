import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connect.js";
import urlRoutes from "./api/v1/url/index.js"
import authRoutes from "./api/v1/auth/index.js"
import statsRoutes from "./api/v1/stats/index.js"
import session from 'express-session';
import { CronJob } from 'cron';
import delteGuestExpiredLinks from "./utils/cron-jobs/DeleteGuestExpiredLinks.js";

const app = express();

// adding middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(express.json());
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "abhaymishra",
  cookie: { maxAge: 3600000 * 24 }
}))
app.use('/api/shorten/url', urlRoutes);
app.use('/api/shorten/auth', authRoutes);
app.use('/api/shorten/stats', statsRoutes);

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


const delteGuestExpiredLinksJob = new CronJob(
  '0 0 * * *',
  function () {
    delteGuestExpiredLinks()
  },
  null, // onComplete
  true, // start
  'America/Los_Angeles' // timeZone
)

delteGuestExpiredLinksJob.start();