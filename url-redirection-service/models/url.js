import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  visitCount: { type: Number, default: 0 }, // Total visits in the last 24 hours
  totalVisitCount: { type: Number, default: 0 }, // Total visit count over the lifetime of the link
  deviceStats: {
    mobile: { type: Number, default: 0 }, // Visits from mobile
    desktop: { type: Number, default: 0 }, // Visits from desktop
    tablet: { type: Number, default: 0 }, // Visits from tablet
  },
  dailyVisitHistory: [{
    date: { type: Date, required: true }, // Date for the day's visit count
    visitCount: { type: Number, default: 0 } // Visits on that day
  }],
  weeklyVisitCount: { type: Number, default: 0 }, // Visits in the last 7 days
  monthlyVisitCount: { type: Number, default: 0 }, // Visits in the last 30 days
  yearlyVisitCount: { type: Number, default: 0 }, // Visits in the last 365 days
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
  },
  expiresAt: { type: Date }, // Optional expiry for guest URLs
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
