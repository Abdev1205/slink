import Url from '../models/urlModel'; // Assuming the file is in models folder

// Update URL Controller
export const updateUrl = async (req, res, next) => {
  const { urlId } = req.params; // Get the URL ID from request params
  const { newShortenedUrl, newStatus } = req.body; // Get the new shortened URL and status from request body
  const userId = req.id; // Assuming you have user info from authentication middleware

  try {
    // Check if a new shortened URL is provided and if it's already taken by someone else
    if (newShortenedUrl) {
      const existingUrl = await Url.findOne({ shortenedUrl: newShortenedUrl });

      if (existingUrl && existingUrl.user.toString() !== urlId) {
        // If the URL is taken by someone else (or even the same user but different URL), return an error
        return res.status(400).json({
          success: false,
          message: 'Shortened URL is already taken.',
        });
      }
    }

    // Check if a new status is provided and if it's a valid status
    const validStatuses = ['active', 'inactive', 'expired'];
    if (newStatus && !validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    // Find the URL by ID and check if the user owns it
    const url = await Url.findOne({ _id: urlId, user: userId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found or you do not have permission to update this URL.',
      });
    }

    // If a new shortened URL is provided, update it
    if (newShortenedUrl) {
      url.shortenedUrl = newShortenedUrl;
    }

    // If a new status is provided, update it
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