import Url from "../../models/url.js";

// Update URL Controller
export const updateUrl = async (req, res, next) => {
  const { urlId } = req.params; // Get the URL ID from request params
  const { newOriginalUrl, newShortenedUrl, newStatus } = req.body; // Get the new shortened URL and status from request body
  const userId = req.id; // Assuming you have user info from authentication middleware

  try {
    // Find the URL by ID and check if the user owns it
    const url = await Url.findOne({ _id: urlId, user: userId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found or you do not have permission to update this URL.',
      });
    }

    // If new shortened URL is provided, check if it's changed
    if (newShortenedUrl && newShortenedUrl !== url.shortenedUrl) {
      // Check if the new shortened URL is already taken
      const existingUrl = await Url.findOne({ shortenedUrl: newShortenedUrl });

      if (existingUrl) {
        return res.status(400).json({
          success: false,
          message: 'Shortened URL is already taken.',
        });
      }
    }

    // Check if new original URL is provided and validate it
    if (newOriginalUrl && (!/^https?:\/\//i.test(newOriginalUrl))) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    // Check if new status is provided and validate it
    const validStatuses = ['active', 'inactive', 'expired'];
    if (newStatus && !validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    // Update the URL fields if new values are provided
    if (newOriginalUrl) {
      url.originalUrl = newOriginalUrl;
    }

    if (newShortenedUrl) {
      url.shortenedUrl = newShortenedUrl;
    }

    if (newStatus) {
      url.status = newStatus;
    }

    // Save the updated URL
    await url.save();

    return res.status(200).json({
      success: true,
      message: 'URL updated successfully.',
      data: url,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};
