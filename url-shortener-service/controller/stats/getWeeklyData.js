import Url from '../../models/url.js';// Adjust the path according to your project structure
import mongoose from 'mongoose';

const getWeeklyData = async (req, res) => {
  try {
    const userId = req.id; // Assuming `req.id` contains the authenticated user's ID
    let { startDate, endDate } = req.query; // Optionally passed in query params

    // If startDate or endDate are not provided, default to the last 7 days
    if (!startDate || !endDate) {
      const today = new Date();
      endDate = today;
      startDate = new Date();
      startDate.setDate(today.getDate() - 7); // Set start date to 7 days before today
    } else {
      // Convert to Date objects if provided
      startDate = new Date(startDate);
      endDate = new Date(endDate);
    }

    // Aggregation pipeline to get weekly visit counts for the specific user
    const weeklyData = await Url.aggregate([
      {
        $match: {
          user: userId, // Match URLs belonging to the authenticated user
          'dailyVisitHistory.date': { $gte: startDate, $lte: endDate } // Match the date range
        }
      },
      {
        $unwind: '$dailyVisitHistory' // Deconstruct the `dailyVisitHistory` array
      },
      {
        $match: {
          'dailyVisitHistory.date': { $gte: startDate, $lte: endDate } // Match within date range again after unwinding
        }
      },
      {
        $group: {
          _id: {
            week: {
              $isoWeek: '$dailyVisitHistory.date' // Group by week number
            },
            year: {
              $isoWeekYear: '$dailyVisitHistory.date' // Group by year to handle cross-year weeks
            }
          },
          totalVisits: { $sum: '$dailyVisitHistory.visitCount' } // Sum the visits for that week
        }
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 } // Sort by year and week
      },
      {
        $project: {
          _id: 0,
          week: '$_id.week', // Display week number
          year: '$_id.year', // Display year
          totalVisits: 1
        }
      }
    ]);

    // Format the data for the chart
    const formattedData = weeklyData.map(entry => ({
      name: `Week ${entry.week}, ${entry.year}`,
      visits: entry.totalVisits
    }));

    res.json(formattedData); // Send the formatted data as a response
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default getWeeklyData;
