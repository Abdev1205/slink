import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connect.js";
import urlRoutes from "./api/v1/url/index.js";
import authRoutes from "./api/v1/auth/index.js";
import statsRoutes from "./api/v1/stats/index.js";
import session from 'express-session';
import { CronJob } from 'cron';
import delteGuestExpiredLinks from "./utils/cron-jobs/DeleteGuestExpiredLinks.js";

// Load environment variables from .env
config({
  path: ".env"
});

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://slink-eta.vercel.app", // Frontend URL
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'Accept',
    'Cache-Control',
    'DNT',
    'If-Modified-Since',
    'Keep-Alive',
    'Origin',
    'User-Agent',
    'X-Requested-With',
    'company-code'
  ],
  exposedHeaders: ['Content-Length', 'Content-Range'],
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware before other middleware and routes
app.use(cors(corsOptions));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
  resave: false, // Recommended setting
  saveUninitialized: false, // Recommended setting
  secret: process.env.SESSION_SECRET || "abhaymishra", // Use an environment variable for security
  cookie: {
    maxAge: 3600000 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
    httpOnly: true, // Helps mitigate XSS attacks
    sameSite: 'lax' // Adjust as needed (e.g., 'strict' or 'none')
  }
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));

// API routes
app.use('/api/shorten/url', urlRoutes);
app.use('/api/shorten/auth', authRoutes);
app.use('/api/shorten/stats', statsRoutes);

// Default welcome route
app.get("/api/shorten", (req, res) => {
  res.send("Hi Welcome to shorten service");
});

// Database connection
const databaseConnection = async () => {
  try {
    await connectDb(process.env.DATABASE_URL); // Ensure DATABASE_URL is in your .env file
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};
databaseConnection();

// Cron job for deleting expired guest links
const delteGuestExpiredLinksJob = new CronJob(
  '0 0 * * *', // Runs daily at midnight
  function () {
    delteGuestExpiredLinks();
  },
  null, // onComplete callback (none in this case)
  true, // Start the cron job immediately
  'America/Los_Angeles' // Timezone
);
delteGuestExpiredLinksJob.start();

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
