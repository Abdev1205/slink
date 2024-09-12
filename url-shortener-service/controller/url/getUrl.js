import Url from "../../models/url.js";


// Get URLs for a specific user with optional filters
export const getUrls = async (req, res) => {
  try {
    const userId = req.id; // Assuming user ID is stored in req.userId
    const { status, startDate, endDate } = req.query; // Extract filter parameters

    // Build query object
    let query = { user: userId };

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Add date range filter if provided
    if (startDate && endDate) {
      query.expiresAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.expiresAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.expiresAt = { $lte: new Date(endDate) };
    }

    const urls = await Url.find(query).exec();

    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

