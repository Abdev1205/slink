import Url from "../../models/url.js";

export const DailyStatsUpdation = async () => {
  try {
    const urls = await Url.find({}); // Fetch all URLs from MongoDB

    const currentDate = new Date();
    const oneDayMillis = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    for (const url of urls) {
      const todayVisitCount = url.visitCount; // Get the current day's visit count

      // Add today's visit count to the daily history
      url.dailyVisitHistory.push({
        date: currentDate,
        visitCount: todayVisitCount,
      });

      // Initialize counters for weekly, monthly, and yearly stats
      let weeklyVisitCount = 0;
      let monthlyVisitCount = 0;
      let yearlyVisitCount = 0;

      // Filter and accumulate counts for 7, 30, and 365 days in one iteration
      url.dailyVisitHistory = url.dailyVisitHistory.filter(item => {
        const diff = currentDate - item.date;

        // Weekly: Visits in the last 7 days
        if (diff <= 7 * oneDayMillis) {
          weeklyVisitCount += item.visitCount;
        }

        // Monthly: Visits in the last 30 days
        if (diff <= 30 * oneDayMillis) {
          monthlyVisitCount += item.visitCount;
        }

        // Yearly: Visits in the last 365 days
        if (diff <= 365 * oneDayMillis) {
          yearlyVisitCount += item.visitCount;
        }

        // Only keep entries within the last 365 days
        return diff <= 365 * oneDayMillis;
      });

      // Update the URL's weekly, monthly, and yearly counts
      url.weeklyVisitCount = weeklyVisitCount;
      url.monthlyVisitCount = monthlyVisitCount;
      url.yearlyVisitCount = yearlyVisitCount;

      // Reset the visit count for the new day
      url.visitCount = 0;

      // Save the updated URL document in MongoDB (only once)
      await url.save();
    }

    console.log("Stats updated and daily visit counts reset successfully.");
  } catch (error) {
    console.error("Error updating stats at midnight: ", error);
  }
};
