import Url from "../../models/url.js";
import generateShortUrl from "../../utils/generateShortUrl.js";

const shortUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  try {
    // Check if the user is a guest
    const isGuest = req?.user?.guest;
    const expiresAt = isGuest ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null;

    // Look for an existing URL for this user
    const existingUrl = await Url.findOne({
      originalUrl: url,
      user: isGuest ? req?.user?.guestId : req.id // Check for guest or authenticated user
    });

    // Return existing URL for guest users
    if (existingUrl) {
      return res.status(200).json({
        message: "URL already exists for this user",
        originalUrl: url,
        shortenedUrl: existingUrl.shortenedUrl
      });
    }

    // Generate new shortened URL if no match was found
    const shortUrl = generateShortUrl();

    const newUrl = new Url({
      originalUrl: url,
      shortenedUrl: shortUrl,
      user: isGuest ? req?.user?.guestId : req.id,
      status: 'active',
      createdAt: new Date(),
      expiresAt: expiresAt // Set expiration for guest users
    });

    await newUrl.save();

    return res.status(201).json({
      message: isGuest ? "Guest URL saved successfully (valid for 24 hours)" : "Authenticated user URL saved successfully",
      shortenedUrl: shortUrl,
      originalUrl: url
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default shortUrl;
