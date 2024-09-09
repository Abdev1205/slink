import Url from "../../models/url.js";
import generateShortUrl from "../../utils/generateShortUrl.js";

export const shortUrl = async (req, res, next) => {
  const { url } = req.body;
  console.log("URL", url);
  console.log("user", req?.user)
  console.log("auth user", req?.id)

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  try {
    const existingUrl = await Url.findOne({ originalUrl: url });
    console.log("existingUrl: " + existingUrl)
    if (existingUrl && existingUrl.shortenedUrl) {
      return res.status(200).json({ message: "URL already exists", originalUrl: url, shortenedUrl: existingUrl.shortenedUrl });
    }

    const shortUrl = generateShortUrl();

    const newUrl = new Url({
      originalUrl: url,
      shortenedUrl: shortUrl,
      user: req?.user?.guest ? req?.user?.guestId : req.id, // guestId or user id
      createdAt: new Date(),
    });

    await newUrl.save();

    return res.status(201).json({ message: "URL saved successfully", shortenedUrl: shortUrl, originalUrl: url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default shortUrl;
