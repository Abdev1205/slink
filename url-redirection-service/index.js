import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connect.js";
import urlRoutes from "./api/v1/url/index.js"
import { CronJob } from 'cron';
import { VisitCountUpdation } from "./utils/cron-jobs/VisitCountUpdation.js";
import { DailyStatsUpdation } from "./utils/cron-jobs/DailyStatsUpdation.js";


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
app.use('/', urlRoutes);

// console.log(process.env.Frontend_URL)

config({
  path: ".env"
});

const PORT = process.env.PORT || 5001;
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


// cron jobs 

const testCronJob = new CronJob(
  '* * * * * *', // cronTime
  function () {
    console.log('we are testing the cron job');
  }, // onTick
  null, // onComplete
  false, // start
  'America/Los_Angeles' // timeZone
);

// testCronJob.start();

const updateVisitCountJob = new CronJob(
  '*/1 * * * *',
  function () {
    VisitCountUpdation();
  },
  null, // onComplete
  true, // start
  'America/Los_Angeles' // timeZone
);

updateVisitCountJob.start();

const dailyStatsUpdationJob = new CronJob(
  '0 0 * * *',
  function () {
    DailyStatsUpdation();
  },
  null, // onComplete
  true, // start
  'America/Los_Angeles' // timeZone
)

dailyStatsUpdationJob.start();

// const dailyStatsUpdationJob = new CronJob(
//   '*/1 * * * *',
//   function () {
//     DailyStatsUpdation();
//   },
//   null, // onComplete
//   true, // start
//   'America/Los_Angeles' // timeZone
// )

// dailyStatsUpdationJob.start();


