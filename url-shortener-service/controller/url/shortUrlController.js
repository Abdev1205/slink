import Url from "../../models/url.js";
import generateShortUrl from "../../utils/generateShortUrl.js";

export const shortUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  try {
    const existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.status(409).json({ message: "URL already exists" });
    }
    const shortUrl = generateShortUrl();
    const newUrl = new Url({ originalUrl: url, shortenedUrl: shortUrl });

    await newUrl.save();

    return res.status(201).json({ message: "URL saved successfully", shortUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default shortUrl;
